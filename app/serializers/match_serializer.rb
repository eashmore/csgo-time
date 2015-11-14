ActiveModel::Serializer.config.adapter = :json

class MatchSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :has_started, :current_round, :winner_id

  belongs_to :winner
  has_many :teams
  has_many :bets

end
