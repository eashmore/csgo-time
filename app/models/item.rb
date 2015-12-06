class Item < ActiveRecord::Base
  validates :name, :price, :gun_type, :condition, :rarity, :image_url,
            presence: true

  belongs_to :user
  belongs_to :bet

  def self.bet_items(bet_id)
    where(bet_id: bet_id)
  end
end
