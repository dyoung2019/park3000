Rails.application.routes.draw do
  resources :parking_restrictions
  get '/api/ParkingRestrictions', to: 'api/parking_restrictions#index'
  resources :pay_stay_zones
  # get '/api/PayStayZones/' 
  resources :parking_bays
  resources :parking_map

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/', to: 'parking_map#index'

end

