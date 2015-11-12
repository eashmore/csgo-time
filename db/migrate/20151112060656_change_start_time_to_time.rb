class ChangeStartTimeToTime < ActiveRecord::Migration
  def change
    remove_column :matches, :start_time, :datetime
    add_column :matches, :start_time, :time
  end
end
