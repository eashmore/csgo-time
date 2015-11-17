class AddMapToMatch < ActiveRecord::Migration
  def change
    add_column :matches, :map, :string
  end
end
