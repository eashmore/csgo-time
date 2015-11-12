class BetSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :user
  belongs_to :match
  belongs_to :team
end
