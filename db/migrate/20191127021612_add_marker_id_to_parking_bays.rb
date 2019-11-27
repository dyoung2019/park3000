class AddMarkerIdToParkingBays < ActiveRecord::Migration[6.0]
  def change
    add_column :parking_bays, :marker_id, :text
  end
end
