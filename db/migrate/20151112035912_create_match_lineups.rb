class CreateMatchLineups < ActiveRecord::Migration
  def change
    create_table :match_lineups do |t|
      t.integer :match_id
      t.integer :team_id

      t.timestamps null: false
    end

    add_index :match_lineups, :match_id
    add_index :match_lineups, :team_id
  end
end
