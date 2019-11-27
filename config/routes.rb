Rails.application.routes.draw do
  resources :parking_restrictions
  get '/api/ParkingRestrictions', to: 'api/parking_restrictions#index'
  resources :pay_stay_zones
  # get '/api/PayStayZones/' 
  resources :parking_bays
  # get '/api/ParkingBays/'
  
  # get '/', to:'layouts#application' 
end

