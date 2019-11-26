class CreateParkingBays < ActiveRecord::Migration[6.0]
  def change
    create_table :parking_bays do |t|
      t.integer :bay_ID
      t.json :the_geom
      t.string :rd_seg_id
      t.string :rd_seg_dsc
      t.references :pay_stay_zone, null: false, foreign_key: true

      t.timestamps
      
    end
  end
end
