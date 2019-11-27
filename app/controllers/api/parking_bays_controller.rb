class Api::ParkingBaysController < ApplicationController
    def get_smaller_set()
        records = ParkingBay.select(:marker_id).select(:the_geom).all

        bays = records.map do | record |
          bay = {}
          bay[:marker_id] = record.marker_id unless !record.marker_id
          bay[:the_geom] = record.the_geom.map do | point |
            point.map do | num |
              # Shaving resolution down 6 decimals(i.e. 10cm) according to Bing Maps
              num.round(6)
            end 
          end
          bay
        end
        bays
    end
    
    def index
        bays = get_smaller_set()

        # bays = ParkingBay.all
        render json: bays
    end
end
