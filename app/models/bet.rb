class Bet < ActiveRecord::Base
  validates :total_value, :user, :match, :team, presence: true

  belongs_to :user
  belongs_to :match
  belongs_to :team
  has_many :items
end
