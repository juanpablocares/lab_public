Rails.application.routes.draw do

	namespace :api do
		get 'users', to: 'users#index', defaults: {format: 'json'}
		get 'users/rut/:rut', to: 'users#search', defaults: {format: 'json'}
		get 'users/nombre/:nombre', to: 'users#search_nombre', defaults: {format: 'json'}
		get 'users/paterno/:paterno', to: 'users#search_paterno', defaults: {format: 'json'}
		get 'users/paterno/:materno', to: 'users#search_materno', defaults: {format: 'json'}
		
		#Controladores de pacientes
		put 'pacientes/rut/:rut', to: 'pacientes#update_byrut', defaults: {format: 'json'}
		get 'pacientes/rut/:rut', to: 'pacientes#search', defaults: {format: 'json'}
		get 'pacientes/nombre/:nombre', to: 'pacientes#search_nombre', defaults: {format: 'json'}
		get 'pacientes/paterno/:paterno', to: 'pacientes#search_paterno', defaults: {format: 'json'}
		get 'pacientes/paterno/:materno', to: 'pacientes#search_materno', defaults: {format: 'json'}
		
		resources :comunas, :defaults => { :format => 'json' }
		resources :previsiones, :defaults => { :format => 'json' }
		resources :regiones, :defaults => { :format => 'json' }
		resources :pacientes, :defaults => { :format => 'json' }
		resources :users, :defaults => { :format => 'json' } do
			collection do
				get 'accountAttributes'
			end
		end
	end

	mount_devise_token_auth_for 'User', at: '/auth', skip: [:omniauth_callbacks], controllers: {
		sessions:           'overrides/sessions',
		passwords:           'overrides/passwords',
	}
	# The priority is based upon order of creation: first created -> highest priority.
	# See how all your routes lay out with "rake routes".

	# You can have the root of your site routed with "root"
	root 'application#angular'

# Example of regular route:
#   get 'products/:id' => 'catalog#view'

# Example of named route that can be invoked with purchase_url(id: product.id)
#   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

# Example resource route (maps HTTP verbs to controller actions automatically):
#   resources :products

# Example resource route with options:
#   resources :products do
#     member do
#       get 'short'
#       post 'toggle'
#     end
#
#     collection do
#       get 'sold'
#     end
#   end

# Example resource route with sub-resources:
#   resources :products do
#     resources :comments, :sales
#     resource :seller
#   end

# Example resource route with more complex sub-resources:
#   resources :products do
#     resources :comments
#     resources :sales do
#       get 'recent', on: :collection
#     end
#   end

# Example resource route with concerns:
#   concern :toggleable do
#     post 'toggle'
#   end
#   resources :posts, concerns: :toggleable
#   resources :photos, concerns: :toggleable

# Example resource route within a namespace:
#   namespace :admin do
#     # Directs /admin/products/* to Admin::ProductsController
#     # (app/controllers/admin/products_controller.rb)
#     resources :products
#   end
end
