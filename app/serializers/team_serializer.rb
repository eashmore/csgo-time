class TeamsSerializer < ActiveModel::Serializer
  attributes :id, :name, :odds, :avatar

  has_many :matches
end
