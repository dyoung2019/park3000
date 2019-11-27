Rails.application.routes.draw do

  resources :parking_restrictions
  get '/api/ParkingRestrictions', to: 'api/parking_restrictions#index'

  resources :pay_stay_zones
  get '/api/PayStayZones/', to: 'api/pay_stay_zones#index'

  resources :parking_bays
  get '/api/ParkingBays', to: 'api/parking_bays#index'
  # get '/', to:'layouts#application' 
end
