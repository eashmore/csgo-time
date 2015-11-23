ActiveModel::Serializer.config.adapter = :json

class MatchSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :has_started, :current_round, :winner_id, :map,
    :prize_pool, :has_ended

  has_many :teams
  has_many :bets
  has_many :items
  belongs_to :winner
end
