ActiveModel::Serializer.config.adapter = :json

class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :odds, :avatar_url

  has_many :matches,
  has_many :users
end
