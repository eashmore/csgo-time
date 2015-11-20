class MatchLineup < ActiveRecord::Base
  validates :match, :team, presence: true

  belongs_to :team
  belongs_to :match
end
