class Itemdb < ActiveRecord::Base
  validates :name, :price, :gun_type, :condition, :rarity,
            :image_url, presence: true
end
