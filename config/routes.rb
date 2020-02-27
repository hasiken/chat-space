Rails.application.routes.draw do
  devise_for :rails
  devise_for :users
   # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "groups#index"
  resources :users, only: [:edit, :update,:index]
  resources :groups,only: [:create, :new, :edit, :update, :index] do
    resources :messages,only: [:index, :create]
  end
end
