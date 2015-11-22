class AddPrizePoolToMatches < ActiveRecord::Migration
  def change
    add_column :matches, :prize_pool, :integer, default: 0
  end
end
