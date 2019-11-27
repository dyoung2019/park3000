# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'smarter_csv'
require 'json'

ParkingRestriction.destroy_all
ParkingBay.destroy_all
PayStayZone.destroy_all

parking_restrictions = SmarterCSV.process('data/parking_restrictions.csv')
pay_stay_zones = SmarterCSV.process('data/pay_stay_zones.csv')

pay_stay_zones.each do |zone|
    z = PayStayZone.new
    z.pay_stay_zone = zone[:pay_stay_zone]
    z.rd_seg_id = zone[:street_segment_id]
    z.save
end

parking_restrictions.each do |restriction|
    r = ParkingRestriction.new
    r.pay_stay_zone = restriction[:pay_stay_zone]
    pay_stay_zone_record = PayStayZone.find_by(pay_stay_zone: r.pay_stay_zone)
    # pay_stay_zone_record = restriction[:pay_stay_zone]
    if pay_stay_zone_record
        r.pay_stay_zone_id = pay_stay_zone_record.id
        r.day_of_week = restriction[:day_of_week]
        r.start_time = restriction[:start_time]
        r.end_time = restriction[:end_time]
        r.maximum_stay = restriction[:maximum_stay]
        r.cost_per_hour = restriction[:cost_per_hour ]
        r.save    
    else
        puts "Pay Stay Zone: #{r.pay_stay_zone}, was not found"
    end
end

parking_bays = JSON.parse(File.read('data/parking_bays.geojson'))

parking_bays["features"].each do |feature|
    p=ParkingBay.new
    p.marker_id = feature["properties"]["marker_id"]
    # p.pay_stay_zone_id = PayStayZone.find_by(pay_stay_zone: p.pay_stay_zone).id
    p.bay_ID = feature["properties"]["bay_id"]
    p.the_geom = feature["geometry"]["coordinates"][0][0]
    p.rd_seg_id = feature["properties"]["rd_seg_id"]
    p.rd_seg_dsc= feature["properties"]["rd_seg_dsc"]
    p.save
end
