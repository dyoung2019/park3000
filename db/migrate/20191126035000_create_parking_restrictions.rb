class CreateParkingRestrictions < ActiveRecord::Migration[6.0]
  def change
    create_table :parking_restrictions do |t|
      t.string :pay_stay_zone
      t.integer :day_of_week
      t.time :start_time
      t.time :end_time
      t.integer :maximum_stay
      t.integer :cost_per_hour

      t.timestamps
    end
  end
end
