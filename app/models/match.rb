class Match < ActiveRecord::Base
  validates :map, presence: true

  belongs_to :winner, class_name: 'Team'
  has_many :bets
  has_many :items, through: :bets

  has_many :match_lineups
  has_many :teams, through: :match_lineups
end
