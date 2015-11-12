class MatchSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :has_started, :current_round

  belongs_to :winner

  # has_many :bets

end
