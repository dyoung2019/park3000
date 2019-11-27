class Api::PayStayZonesController < ApplicationController
    def index
        zones = PayStayZone.all
        render json: zones
    end
end
