class Match < ActiveRecord::Base
  validates :start_time, presence: true

  belongs_to :winner, class_name: 'team'
  has_many :match_lineups
  has_many :teams, through: :match_lineups

end
