class Item < ActiveRecord::Base
  validates :name, :price, :gun_type, :condition, :rarity, :image_url,
            presence: true

  belongs_to :user
  belongs_to :bet
end
