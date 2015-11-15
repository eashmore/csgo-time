class CreateItemdbs < ActiveRecord::Migration
  def change
    create_table :itemdbs do |t|
      t.string :name
      t.float :price
      t.string :gun_type
      t.string :condition
      t.string :rarity
      t.boolean :is_stattrack, default: false
      t.boolean :is_souvenir, default: false
      t.string :image_url

      t.timestamps null: false
    end
  end
end
