ActiveModel::Serializer.config.adapter = :json

class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :odds, :rounds_won, :avatar_url

  has_many :matches
  has_many :bets
end
