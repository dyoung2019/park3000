require 'smarter_csv'

pay_stay_zones = SmarterCSV.process('pay_stay_zones.csv')

# p pay_stay_zones.class

# pay_stay_zones.each do |k,v|
#     p = PayStayZone.new
#     p.bay_id = v

#     p.save 

pay_stay_zones.each do |zone|
    z = ParkingRestriction.new
    z.pay_stay_zone = restriction[:pay_stay_zone]
    z.rd_seg_id = restriction[:rd_seg_id]
    z.save
end
