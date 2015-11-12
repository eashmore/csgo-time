class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :name
      t.float :odds, default: 1
      t.string :avatar_url, default: ""

      t.timestamps null: false
    end
  end
end
