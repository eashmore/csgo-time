class CreateMatches < ActiveRecord::Migration
  def change
    create_table :matches do |t|
      t.datetime :start_time
      t.boolean :has_started, default: false
      t.integer :current_round
      t.integer :winner_id

      t.timestamps null: false
    end

    add_index(:matches, :winner_id)
  end
end
