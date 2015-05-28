Rails.application.routes.draw do

	namespace :api do
		get 'users', to: 'users#index', defaults: {format: 'json'}
		get 'users/rut/:rut', to: 'users#search', defaults: {format: 'json'}
		get 'users/nombre/:nombre', to: 'users#search_nombre', defaults: {format: 'json'}
		get 'users/paterno/:paterno', to: 'users#search_paterno', defaults: {format: 'json'}
		get 'users/paterno/:materno', to: 'users#search_materno', defaults: {format: 'json'}
		
		#Controladores de pacientes
		post 'pacientes/range/:start/:number', to: 'pacientes#range', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		put 'pacientes/rut/:rut', to: 'pacientes#update_byrut', defaults: {format: 'json'}
		get 'pacientes/rut/:rut', to: 'pacientes#search', defaults: {format: 'json'}
		get 'pacientes/buscar/:rut', to: 'pacientes#search', defaults: {format: 'json'}, constraints: { :rut => /[0-9]+/ }
		get 'pacientes/buscar/:nombre', to: 'pacientes#search_texto', defaults: {format: 'json'}
		get 'pacientes/nombre/:nombre', to: 'pacientes#search_nombre', defaults: {format: 'json'}
		get 'pacientes/paterno/:paterno', to: 'pacientes#search_paterno', defaults: {format: 'json'}
		get 'pacientes/paterno/:materno', to: 'pacientes#search_materno', defaults: {format: 'json'}
		
		#Controladores de fichas
		get 'fichas/pagos/:id', to: 'fichas#pagos', defaults: {format: 'json'}
		get 'fichas/paciente/:id', to: 'fichas#show_bypaciente', defaults: {format: 'json'}
		post 'fichas/range/:start/:number', to: 'fichas#range', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		post 'fichas/muestras/:start/:number', to: 'fichas#muestras', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		
		#Controladores de perfiles
		get 'perfiles/filtrar_tarifas/:id', to: 'perfiles#filtrar_tarifas', defaults: {format: 'json'},  constraints: { :id=> /[0-9]+/}
	
		#Controladores de examenes 
		get 'examenes/filtrar_tarifas/:id', to: 'examenes#filtrar_tarifas', defaults: {format: 'json'},  constraints: { :id=> /[0-9]+/}
		get 'examenes/select', to: 'examenes#select', defaults: {format: 'json'}
		put 'examenes/', to: 'examenes#update_all', defaults: {format: 'json'}
		post 'examenes/range/:start/:number', to: 'examenes#range', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		
		
		#Controladores de tarifas
		get 'tarifas/examenes', to: 'tarifas#examenes', defaults: {format: 'json'}
		post 'tarifas/range/:start/:number', to: 'tarifas#range', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		

		#Controladores de tarifas examenes
		get 'tarifas_examen/', to: 'tarifas_examen#index', defaults: {format: 'json'}
		get 'tarifas_examen/:id', to: 'tarifas_examen#show', defaults: {format: 'json'}
		put 'tarifas_examen/:id', to: 'tarifas_examen#update', defaults: {format: 'json'}
		put 'tarifas_examen/', to: 'tarifas_examen#update_all', defaults: {format: 'json'}
		get 'tarifas_examen/examen/:examen_id', to: 'tarifas_examen#show_examen', defaults: {format: 'json'}
		post 'tarifas_examen/range/:tarifa_id/:start/:number', to: 'tarifas_examen#range', defaults: {format: 'json'}, constraints: { :tarifa_id=> /[0-9]+/, :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		
		#Controladores de previsiones
		post 'previsiones/range/:start/:number', to: 'previsiones#range', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 

		#Controladores detalle_ficha
		post 'detalles_ficha/muestras_tomadas/:start/:number', to: 'detalles_ficha#muestras_tomadas', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		post 'detalles_ficha/paciente/:id/:start/:number', to: 'detalles_ficha#get_by_paciente', defaults: {format: 'json'}, constraints: {:id =>/[0-9]+/, :start=> /[0-9]+/, :number=> /[0-9]+/ }
		post 'detalles_ficha/ficha/:id/:start/:number', to: 'detalles_ficha#get_by_ficha', defaults: {format: 'json'}, constraints: {:id =>/[0-9]+/, :start=> /[0-9]+/, :number=> /[0-9]+/ }
		get 'detalles_ficha/ficha/:id', to: 'detalles_ficha#get_by_ficha', defaults: {format: 'json'}, constraints: {:id =>/[0-9]+/}
		
		#Controladores sustancias_examen
		get 'sustancias_examen/examen/:id', to: 'sustancias_examen#get_by_examen', defaults: {format: 'json'}, constraints: {:id =>/[0-9]+/}
		
		#Controladores sustancias_examen
		get 'resultados_examen/detalle_ficha/:id', to: 'resultados_examen#get_by_detalle_ficha', defaults: {format: 'json'}, constraints: {:id =>/[0-9]+/}
		post 'resultados_examen/detalle_ficha/:id', to: 'resultados_examen#save_batch_by_detalle_ficha', defaults: {format: 'json'}, constraints: {:id =>/[0-9]+/}
		
		get 'detalles_pago_ficha/ficha/:id', to: 'detalles_pago_ficha#getAllByFicha', defaults: {format: 'json'}
		
		
		resources :resultados_examen, :defaults => { :format => 'json' }
		resources :sustancias_examen, :defaults => { :format => 'json' }
		resources :comunas, :defaults => { :format => 'json' }
		resources :detalles_ficha , :defaults => { :format => 'json' }
		resources :fichas, :defaults => { :format => 'json' }
		resources :indicaciones, :defaults => { :format => 'json' }
		resources :indicaciones_muestra, :defaults => { :format => 'json' }
		resources :previsiones, :defaults => { :format => 'json' }
		resources :regiones, :defaults => { :format => 'json' }
		resources :pacientes, :defaults => { :format => 'json' }
		resources :examenes, :defaults => { :format => 'json' }
		resources :tarifas, :defaults => { :format => 'json' }
		resources :cotizaciones, :defaults => { :format => 'json' }
		resources :medicos, :defaults => { :format => 'json' }
		resources :procedencias, :defaults => { :format => 'json' }
		resources :perfiles, :defaults => { :format => 'json' }
		resources :tapas_tubo, :defaults => { :format => 'json' }
		resources :tipos_envase , :defaults => { :format => 'json' }
		resources :tipo_examenes, :defaults => { :format => 'json' }
		resources :tipos_muestras, :defaults => { :format => 'json' }
		resources :tipos_pago , :defaults => { :format => 'json' }
		resources :detalles_pago_ficha, :defaults => { :format => 'json' }
		
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
