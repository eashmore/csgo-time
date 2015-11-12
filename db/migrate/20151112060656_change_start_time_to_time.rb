class ChangeStartTimeToTime < ActiveRecord::Migration
  def change
    remove_column :matches, :start_time, :datetime
    add_column :matches, :start_time, :string
  end
end
