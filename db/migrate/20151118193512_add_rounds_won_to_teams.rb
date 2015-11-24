class AddRoundsWonToTeams < ActiveRecord::Migration
  def change
    add_column :teams, :rounds_won, :integer, default: 0
  end
end
