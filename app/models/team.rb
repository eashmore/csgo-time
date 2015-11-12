class Team < ActiveRecord::Base
  validates :name, :odds, presence: true
  validates :name, uniqueness: true

  # has_many :matches

end
