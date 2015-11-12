class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :odds, :avatar_url

  has_many :matches
end
