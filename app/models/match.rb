class Match < ActiveRecord::Base
  validates :map, presence: true

  belongs_to :winner, class_name: 'Team'
  has_many :bets, -> { order('created_at desc') }
  has_many :items, through: :bets

  has_many :match_lineups
  has_many :teams, through: :match_lineups

  def self.current_match
    where(is_current: true)
  end

  def simulate_match
    self.has_started = true
    save
    team1 = teams[0]
    team2 = teams[1]

    match_over?(team1, team2)

    until match_over?(team1, team2)
      increment_round if current_round < 16
      sleep 2
      simulate_round(team1, team2)
    end

    pay_bets
  end

  def simulate_round(team1, team2)
    winner = (rand - 0.15).round
    if winner == 0
      team1.rounds_won += 1
      team1.save
    else
      team2.rounds_won += 1
      team2.save
    end
  end

  def match_over?(team1, team2)
    if team1.rounds_won >= 9 || team2.rounds_won >= 9
      winner = team1.rounds_won > team2.rounds_won ? team1 : team2
      self.winner_id = winner.id
      save
      return true
    end

    false
  end

  def increment_round
    self.current_round += 1
    save
  end

  def pay_bets
    @items_hash = hashify_items
    winning_bets = bets.select { |bet| bet.team_id == winner.id }

    winning_bets.each do |bet|
      update_payout(bet)
    end

    distribute_items(winning_bets)
    self.has_ended = true
    save
  end

  def payout_ratio
    pool = 0
    winner_pool = 0
    bets.each do |bet|
      pool += bet.total_value
      winner_pool += bet.total_value if bet.team_id == winner.id
    end

    cut_pool = pool_with_cuts(pool, 0.2)
    cut_pool / winner_pool
  end

  def pool_with_cuts(pool, rake)
    cut_val = pool * rake
    cut_items = {}
    cut_keys = take_rake(cut_val, @items_hash.keys)

    cut_keys.each do |key|
      cut_items[key] = @items_hash[key]
      @items_hash.delete(key)
    end

    new_pool = 0
    @items_hash.each_value do |item|
      new_pool += item.price
    end
    new_pool
  end

  def take_rake(cut_val, item_keys)
    return nil if item_keys.empty?
    target = (cut_val * 100).round / 100
    return [] if target <= 0

    payout = []

    item_keys.each do |i|
      item = @items_hash[i]
      price = item.price
      next if price > target

      remainder = target - price
      remaining_items = item_keys[1..-1]

      current_payout = take_rake(remainder, remaining_items)
      next if current_payout.nil?
      payout = [item_keys[i]].concat(current_payout)
      return payout
    end

    payout
  end

  def distribute_items(winning_bets)
    item_keys = @items_hash.keys.sort { |x, y| y <=> x }
    until item_keys.empty?
      key = item_keys.last
      max = nil
      winning_bets.each do |bet|
        max = bet if max.nil? || bet.payout > max.payout
      end

      pay_user(@items_hash[key], max)
      new_payout = max.payout - @items_hash[key].price
      max.payout = new_payout

      if max.payout <= 0
        winning_bets.delete(max)
        break if winning_bets.empty?
      end

      item_keys.pop
    end
  end

  def hashify_items
    sorted_items = items.sort { |x, y| x.price <=> y.price }
    item_idx = sorted_items.length
    hash = {}
    sorted_items.each do |item|
      item_idx -= 1
      hash[item_idx] = item
    end

    hash
  end

  def update_payout(bet)
    payout = bet.total_value * payout_ratio
    bet.payout = payout
  end

  def pay_user(item, bet)
    user = User.find(bet.id)
    item.user_id = user.id
    item.save
  end
end
