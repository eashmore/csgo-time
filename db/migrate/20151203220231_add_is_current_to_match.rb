class AddIsCurrentToMatch < ActiveRecord::Migration
  def change
    add_column :matches, :is_current, :boolean, default: true
  end
end
