Rails.application.routes.draw do
  resources :parking_restrictions
  resources :pay_stay_zones
  resources :parking_bays
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
