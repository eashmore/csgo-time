ActiveModel::Serializer.config.adapter = :json

class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :gun_type, :condition, :rarity, :is_stattrack,
             :is_souvenir, :image_url, :user_id, :bet_id

  belongs_to :user
  belongs_to :bet
end
