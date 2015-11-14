ActiveModel::Serializer.config.adapter = :json

class BetSerializer < ActiveModel::Serializer
  attributes :id, :total_value, :user_id, :match_id, :team_id

  belongs_to :user
  belongs_to :match
  belongs_to :team
  has_many :items
end
