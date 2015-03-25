Rails.application.routes.draw do

	namespace :api do
		get 'users', to: 'users#index', defaults: {format: 'json'}
		get 'users/rut/:rut', to: 'users#search', defaults: {format: 'json'}
		get 'users/nombre/:nombre', to: 'users#search_nombre', defaults: {format: 'json'}
		get 'users/paterno/:paterno', to: 'users#search_paterno', defaults: {format: 'json'}
		get 'users/paterno/:materno', to: 'users#search_materno', defaults: {format: 'json'}
		
		#Controladores de pacientes
		get 'pacientes', to: 'pacientes#index', defaults: {format: 'json'}
		post 'pacientes/range/:start/:number', to: 'pacientes#range', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		get 'pacientes/:id', to: 'pacientes#show', defaults: {format: 'json'}
		put 'pacientes/rut/:rut', to: 'pacientes#update_byrut', defaults: {format: 'json'}
		get 'pacientes/rut/:rut', to: 'pacientes#search', defaults: {format: 'json'}
		get 'pacientes/buscar/:rut', to: 'pacientes#search', defaults: {format: 'json'}, constraints: { :rut => /[0-9]+/ }
		get 'pacientes/buscar/:nombre', to: 'pacientes#search_texto', defaults: {format: 'json'}
		get 'pacientes/nombre/:nombre', to: 'pacientes#search_nombre', defaults: {format: 'json'}
		get 'pacientes/paterno/:paterno', to: 'pacientes#search_paterno', defaults: {format: 'json'}
		get 'pacientes/paterno/:materno', to: 'pacientes#search_materno', defaults: {format: 'json'}
		
		#Controladores de fichas
		get 'fichas/paciente/:id', to: 'fichas#show_bypaciente', defaults: {format: 'json'}
		post 'fichas/range/:start/:number', to: 'fichas#range', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		
		#Controladores de examenes
		get 'examenes/:id', to: 'examenes#show', defaults: {format: 'json'}
		put 'examenes/:id', to: 'examenes#update', defaults: {format: 'json'}
		post 'examenes/range/:start/:number', to: 'examenes#range', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		
		resources :comunas, :defaults => { :format => 'json' }
		resources :fichas, :defaults => { :format => 'json' }
		resources :indicaciones, :defaults => { :format => 'json' }
		resources :previsiones, :defaults => { :format => 'json' }
		resources :regiones, :defaults => { :format => 'json' }
		resources :pacientes, :defaults => { :format => 'json' }
		resources :examenes, :defaults => { :format => 'json' }
		resources :cotizaciones, :defaults => { :format => 'json' }
		resources :procedencias, :defaults => { :format => 'json' }
		resources :perfiles, :defaults => { :format => 'json' }
		resources :tipo_examenes, :defaults => { :format => 'json' }
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
