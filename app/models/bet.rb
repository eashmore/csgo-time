class Bet < ActiveRecord::Base
  validates :total_value, :team, presence: true
  validates :total_value, numericality: { greater_than: 9 }
  validates :items, length: { minumum: 1, maximum: 10 }

  validates_uniqueness_of :user, scope: :match

  belongs_to :user
  belongs_to :match
  belongs_to :team
  has_many :items
end
