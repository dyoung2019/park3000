require 'json'

parking_bays = JSON.parse(File.read('parking_bays.geojson'))

# parking_bays["features"].each do |feature|
#     p=ParkingBay.new
#     p.bay_ID = feature["properties"]["bay_id"]
#     p.the_geom = feature["geometry"]["coordinates"][0][0]
#     p.rd_seg_id = feature["properties"]["rd_seg_id"]
#     p.rd_seg_dsc= feature["properties"]["rd_seg_dsc"]
#     p.save
# end

p parking_bays["features"][1]["geometry"]["coordinates"][0][0]