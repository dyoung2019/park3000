Rails.application.routes.draw do

  resources :parking_restrictions
  get '/api/ParkingRestrictions', to: 'api/parking_restrictions#index'

  resources :pay_stay_zones
  get '/api/PayStayZones/', to: 'api/pay_stay_zones#index'

  resources :parking_bays
  get '/api/ParkingBays', to: 'api/parking_bays#index'

  resources :parking_map

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/', to: 'parking_map#index'
end
