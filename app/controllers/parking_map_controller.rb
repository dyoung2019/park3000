class ParkingMapController < ApplicationController

  


 
  

  # def home
  #   render :index
  #   # render :home  # <= it can be removed still works
  # end

  def index
    # @current_time = Time.new
    # @current_day = @current_time.wday  # => 0: Day of week: 0 is Sunday
    # @current_hour = @current_time.hour
    # @current_mins = (@current_time.min.to_i)/60.to_f
    # @time_for_check = 13.3

   


    # @bays= ParkingBay.all
    # @zones = PayStayZone.all
    # @restrictions = ParkingRestriction.all
    
    # @count = 0
    # @bays.each do |bay|
    #   if bay['marker_id'] != nil && bay['rd_seg_id'] != nil
    #     @zones.each do|zone|
    #       if bay['rd_seg_id'] == zone['rd_seg_id']
    #         @restrictions.each do |restriction|
    #           restriction_day = restriction['day_of_week']-1
    #           if zone['pay_stay_zone'] == restriction['pay_stay_zone'] && @current_day == restriction_day
    #             res_start_hour = restriction['start_time'].to_s[11..12].to_i 
    #             res_start_mins = restriction['start_time'].to_s[14..15].to_i/60.to_f
    #             st_time = res_start_hour+res_start_mins
    #             res_end_hour = restriction['end_time'].to_s[11..12].to_i 
    #             res_end_mins = restriction['end_time'].to_s[14..15].to_i/60.to_f
    #             end_time = res_end_hour+res_end_mins
    #             if @time_for_check > st_time && @time_for_check < end_time
    #               puts "now #{bay['marker_id']} is #{restriction['maximum_stay']}mins parking and #{restriction['cost_per_hour']/100} per hour"
    #             else
    #               puts "now #{bay['marker_id']} is free"
    #             end


                
    #           end

    #         end








    #       end
    #     end

    #   end
    # end
    
    
  
    

    # puts @time_for_check
    # puts @bays.length
    # puts @restrictions.length
    # puts @zones.length
    render :parking_map
  end

  


end
