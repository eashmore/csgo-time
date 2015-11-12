class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name
      t.float :price
      t.string :gun_type
      t.string :condition
      t.string :rarity
      t.boolean :is_stattrack, default: false
      t.boolean :is_souvenir, default: false
      t.string :image_url
      t.integer :user_id
      t.integer :bet_id

      t.timestamps null: false
    end

    add_index :items, :user_id
    add_index :items, :bet_id
  end
end
