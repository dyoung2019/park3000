class ChangeForeignKeyInParkingBays < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key :parking_bays, :pay_stay_zones
    remove_column :parking_bays, :pay_stay_zone_id
  end
end
