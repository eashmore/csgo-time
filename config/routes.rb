Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create, :show]
  resources :sessions, except: [:edit, :update, :show]

  namespace :api, defaults: { format: :json } do
    resources :matches
  end
end
