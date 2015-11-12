class Match < ActiveRecord::Base
  validates :start_time, presence: true
  # :team_one, :team_two

  # belongs_to :team_one, class_name: 'team'
  # belongs_to :team_two, class_name: 'team'
  # belongs_to :winner, class_name: 'team'
end
