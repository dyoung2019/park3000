require 'smarter_csv'

parking_restrictions = SmarterCSV.process('parking_restrictions.csv')

# p pay_stay_zones.class

# pay_stay_zones.each do |k,v|
#     p = PayStayZone.new
#     p.bay_id = v

#     p.save 

parking_restrictions.each do |restriction|
    r = ParkingRestriction.new
   r.pay_stay_zone = restriction[:pay_stay_zone]
   r.day_of_week = restriction[:day_of_week]
   r.start_time = restriction[:start_time]
   r.end_time = restriction[:end_time]
   r.maximum_stay = restriction[:maximum_stay]
   r.cost_per_hour = restriction[:cost_per_hour ]
    r.save
end
