class Api::ParkingRestrictionsController < ApplicationController
    def index
        restrictions = ParkingRestriction.all
        render json: restrictions
    end
end
