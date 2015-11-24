class Match < ActiveRecord::Base
  validates :map, presence: true

  belongs_to :winner, class_name: 'Team'
  has_many :bets
  has_many :items, through: :bets

  has_many :match_lineups
  has_many :teams, through: :match_lineups

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

      self.has_ended = true
      save

      return true
    end

    false
  end

  def increment_round
    self.current_round += 1
    save
  end
end
