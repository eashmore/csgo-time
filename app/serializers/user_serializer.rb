ActiveModel::Serializer.config.adapter = :json

class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :items
  has_many :bets
end
