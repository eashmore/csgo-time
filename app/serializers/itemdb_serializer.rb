ActiveModel::Serializer.config.adapter = :json

class ItemdbSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :gun_type, :condition, :rarity, :is_stattrack,
             :is_souvenir, :image_url
end
