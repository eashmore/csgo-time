class Team < ActiveRecord::Base
  validates :name, :odds, presence: true
  validates :name, uniqueness: true

  has_many :bets
  has_many :match_lineups
  has_many :matches, through: :match_lineups
  has_many :users, through: :bets
end
