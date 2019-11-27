# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_27_034934) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "parking_bays", force: :cascade do |t|
    t.integer "bay_ID"
    t.json "the_geom"
    t.string "rd_seg_id"
    t.string "rd_seg_dsc"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "marker_id"
  end

  create_table "parking_restrictions", force: :cascade do |t|
    t.string "pay_stay_zone"
    t.integer "day_of_week"
    t.time "start_time"
    t.time "end_time"
    t.integer "maximum_stay"
    t.integer "cost_per_hour"
    t.bigint "pay_stay_zone_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["pay_stay_zone_id"], name: "index_parking_restrictions_on_pay_stay_zone_id"
  end

  create_table "pay_stay_zones", force: :cascade do |t|
    t.string "pay_stay_zone"
    t.string "rd_seg_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "parking_restrictions", "pay_stay_zones"
end
