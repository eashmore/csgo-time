class AddScoresToMatch < ActiveRecord::Migration
  def change
    add_column :matches, :team1_score, :integer, default: 0
    add_column :matches, :team2_score, :integer, default: 0
  end
end
