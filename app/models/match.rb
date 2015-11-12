class Match < ActiveRecord::Base
  validates :start_time, :has_started, presence: true

  belongs_to :winner, class_name: 'team'
  has_many :teams, through: :match_lineups, source: :match

end
