Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:index, :new, :create, :show]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :matches, except: [:new, :edit, :destroy]
    resources :teams, except: [:new, :edit, :destroy]
    resources :items, except: [:new, :edit]
    resources :itemdbs, only: [:create, :index, :show]

    resources :bets, except: [:new, :edit, :index]
    resources :match_lineups, only: [:create]
  end

  get '*path', to: 'static_pages#root'
end
