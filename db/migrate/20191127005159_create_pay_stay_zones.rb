class CreatePayStayZones < ActiveRecord::Migration[6.0]
  def change
    create_table :pay_stay_zones do |t|
      t.string :pay_stay_zone
      t.string :rd_seg_id

      t.timestamps
    end
  end
end
