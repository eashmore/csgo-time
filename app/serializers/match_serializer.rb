class MatchSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :has_started, :current_round

  belongs_to :winner
  has_many :teams
  has_many :bets

  def teams
    team_ids = []
    object.teams.each do |team|
      team_ids << team.id
    end

    team_ids
  end
end
