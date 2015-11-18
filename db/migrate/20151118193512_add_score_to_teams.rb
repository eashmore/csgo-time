class AddScoreToTeams < ActiveRecord::Migration
  def change
    add_column :teams, :score, :integer, default: 0
  end
end
