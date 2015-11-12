class CreateBets < ActiveRecord::Migration
  def change
    create_table :bets do |t|
      t.integer :user_id
      t.integer :match_id
      t.integer :team_id

      t.timestamps null: false
    end

    add_index :bets, :user_id
    add_index :bets, :match_id
    add_index :bets, :team_id
  end
end
