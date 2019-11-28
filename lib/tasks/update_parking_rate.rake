# type the following in terminal to run this file 
# rake update_db:update_rates

namespace :update_db do
    desc "updates db"
  
    task update_rates: :environment do
      all550 = ParkingRestriction.where(cost_per_hour: 550)
      all320 = ParkingRestriction.where(cost_per_hour: 320)
      all200 = ParkingRestriction.where(cost_per_hour: 200)
      all170 = ParkingRestriction.where(cost_per_hour: 170)
      all080 = ParkingRestriction.where(cost_per_hour: 80) 

      all550.each do |r|
        r.cost_per_hour = 700
        r.save
      end

      all320.each do |r|
        r.cost_per_hour = 400
        r.save
      end

      all200.each do |r|
        r.cost_per_hour = 250
        r.save
      end

      all170.each do |r|
        r.cost_per_hour = 220
        r.save
      end

      all080.each do |r|
        r.cost_per_hour = 100
        r.save
      end

    end
end
