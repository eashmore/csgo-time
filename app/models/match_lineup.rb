class MatchLineup < ActiveRecord::Base
  validates :match_id, :team_id, presence: true

  belongs_to :team
  belongs_to :match
end
