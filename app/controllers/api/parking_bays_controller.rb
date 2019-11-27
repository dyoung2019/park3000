class Api::ParkingBaysController < ApplicationController
    def index
        bays = ParkingBay.all
        render json: bays
    end
end
