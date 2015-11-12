class Team < ActiveRecord::Base
  validates :name, :odds, presence: true
  validates :name, uniqueness: true

  has_many :matches, through: :match_linup, source: :team

end
