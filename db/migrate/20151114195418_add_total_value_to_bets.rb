class AddTotalValueToBets < ActiveRecord::Migration
  def change
    add_column :bets, :total_value, :float
  end
end
