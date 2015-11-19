class Bet < ActiveRecord::Base
  validates :total_value, :user, :team, presence: true
  validates :total_value, numericality: { greater_than: 9 }
  validates :items, length: { minumum: 1, maximum: 10 }

  belongs_to :user
  belongs_to :match
  belongs_to :team
  has_many :items
end
