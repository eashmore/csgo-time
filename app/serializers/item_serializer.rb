class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :gun_type, :condition, :rarity, :is_stattrack,
             :is_souvenir, :image_url

  belongs_to :user
  belongs_to :bet
end
