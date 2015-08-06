Rails.application.routes.draw do

	namespace :api do
		##########################Controladores de usuarios##########################
		get 'users', to: 'users#index', defaults: {format: 'json'}
		put 'users', to: 'users#update_all', defaults: {format: 'json'}
		get 'users/rut/:rut', to: 'users#search', defaults: {format: 'json'}
		get 'users/nombre/:nombre', to: 'users#search_nombre', defaults: {format: 'json'}
		get 'users/paterno/:paterno', to: 'users#search_paterno', defaults: {format: 'json'}
		get 'users/paterno/:materno', to: 'users#search_materno', defaults: {format: 'json'}
		##########################Controladores de ##########################
		get 'permisos', to: 'permisos#index', defaults: {format: 'json'}
		put 'permisos/:id', to: 'permisos#update', defaults: {format: 'json'}
		
		##########################Controladores de pacientes##########################
		post 'pacientes/range/:start/:number', to: 'pacientes#range', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		put 'pacientes/rut/:rut', to: 'pacientes#update_byrut', defaults: {format: 'json'}
		get 'pacientes/rut/:rut', to: 'pacientes#search', defaults: {format: 'json'}
		get 'pacientes/buscar/:rut', to: 'pacientes#search', defaults: {format: 'json'}, constraints: { :rut => /[0-9]+/ }
		get 'pacientes/buscar/:nombre', to: 'pacientes#search_texto', defaults: {format: 'json'}
		get 'pacientes/nombre/:nombre', to: 'pacientes#search_nombre', defaults: {format: 'json'}
		get 'pacientes/paterno/:paterno', to: 'pacientes#search_paterno', defaults: {format: 'json'}
		get 'pacientes/paterno/:materno', to: 'pacientes#search_materno', defaults: {format: 'json'}
		
		##########################Controladores de fichas##########################
		get 'fichas/pagos/:id', to: 'fichas#pagos', defaults: {format: 'json'}
		get 'fichas/:id/input_resultados/', to: 'fichas#input_resultados', defaults: {format: 'json'}
		get 'fichas/paciente/:id', to: 'fichas#show_bypaciente', defaults: {format: 'json'}
		post 'fichas/range/:start/:number', to: 'fichas#range', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		post 'fichas/muestras/:start/:number', to: 'fichas#muestras', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		get 'fichas/cantidades', to: 'fichas#cantidades', defaults: {format: 'json'}
		#controladores de cotizaciones
		get 'cotizaciones/paciente/:id', to: 'cotizaciones#show_bypaciente', defaults: {format: 'json'}
		#Controladores detalle_ficha
		post 'detalles_ficha/muestras_tomadas/:start/:number', to: 'detalles_ficha#muestras_tomadas', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		post 'detalles_ficha/paciente/:id/:start/:number', to: 'detalles_ficha#get_by_paciente', defaults: {format: 'json'}, constraints: {:id =>/[0-9]+/, :start=> /[0-9]+/, :number=> /[0-9]+/ }
		post 'detalles_ficha/ficha/:id/:start/:number', to: 'detalles_ficha#get_by_ficha', defaults: {format: 'json'}, constraints: {:id =>/[0-9]+/, :start=> /[0-9]+/, :number=> /[0-9]+/ }
		get 'detalles_ficha/ficha/:id', to: 'detalles_ficha#get_by_ficha', defaults: {format: 'json'}, constraints: {:id =>/[0-9]+/}
		#Controlador detalle pago ficha
		post 'detalles_pago_ficha/range/:start/:number/:facturadas', to: 'detalles_pago_ficha#range', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		get 'detalles_pago_ficha/ficha/:id', to: 'detalles_pago_ficha#getAllByFicha', defaults: {format: 'json'}
		put 'detalles_pago_ficha/', to: 'detalles_pago_ficha#update_all', defaults: {format: 'json'}
		#Controlador de resultados asignados
		get 'resultados_examen/detalle_ficha/:detalle_ficha_id/examen_parametro/:examen_parametro_id', to: 'resultados_examen#get_resultado', defaults: {format: 'json'}
		put 'resultados_examen/detalle_ficha/:detalle_ficha_id/examen_parametro/:examen_parametro_id', to: 'resultados_examen#update_resultado', defaults: {format: 'json'}
		put 'resultados_examen/detalle_ficha_validar/:detalle_ficha_id/examen_parametro/:examen_parametro_id', to: 'resultados_examen#update_validar_resultado', defaults: {format: 'json'}
		
		##########################Controladores de examenes##########################
		get 'examenes/filtrar_tarifas/:id', to: 'examenes#filtrar_tarifas', defaults: {format: 'json'},  constraints: { :id=> /[0-9]+/}
		get 'examenes/select', to: 'examenes#select', defaults: {format: 'json'}
		put 'examenes/', to: 'examenes#update_all', defaults: {format: 'json'}
		post 'examenes/range/:start/:number', to: 'examenes#range', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		#Controladores modificaciones examenes
		get 'modificacion_examenes/examen/:examen_id', to: 'modificacion_examenes#findby_examen', defaults: {format: 'json'},  constraints: { :id=> /[0-9]+/}
		post 'modificacion_examenes/crear/:examen_id/:user_id', to: 'modificacion_examenes#create', defaults: {format: 'json'}
		#Controladores alias examenes
		get 'alias_examenes/examen/:examen_id', to: 'alias_examenes#by_examen', defaults: {format: 'json'}
		put 'alias_examenes/', to: 'alias_examenes#update_all', defaults: {format: 'json'}
		#Controladores indicaciones muestras
		put 'indicaciones_muestra/', to: 'indicaciones_muestra#update_all', defaults: {format: 'json'}
		delete 'indicaciones_muestra/:id', to: 'indicaciones_muestra#delete', defaults: {format: 'json'}
		#Controladores instituciones
		put 'instituciones/update_all/', to: 'instituciones#update_all', defaults: {format: 'json'}
		delete 'instituciones/:id', to: 'instituciones#delete', defaults: {format: 'json'}
		#Controladores de hora preoceso examenes
		get 'horaproceso_examenes/examen/:examen_id', to: 'horaproceso_examenes#by_examen', defaults: {format: 'json'}
		put 'horaproceso_examenes/', to: 'horaproceso_examenes#update_all', defaults: {format: 'json'}
		#Controladores de perfiles
		get 'perfiles/filtrar_tarifas/:id', to: 'perfiles#filtrar_tarifas', defaults: {format: 'json'},  constraints: { :id=> /[0-9]+/}
		#Controladores examenes parametros
		get 'examenes_parametros/examen/:examen_id', to: 'examenes_parametros#get_parametros', defaults: {format: 'json'}
		put 'examenes_parametros/', to: 'examenes_parametros#update_all', defaults: {format: 'json'}
		delete 'examenes_parametros/:id', to: 'examenes_parametros#delete', defaults: {format: 'json'}
		
		##########################Controladores de medicos##########################
		post 'medicos/range/:start/:number', to: 'medicos#range', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		post 'medicos/', to: 'medicos#create', defaults: {format: 'json'}
		get 'medicos/:id', to: 'medicos#show', defaults: {format: 'json'}
		put 'medicos/:id', to: 'medicos#update', defaults: {format: 'json'}
		delete 'medicos/:id', to: 'medicos#delete', defaults: {format: 'json'}
		#Controladores especialidades
		put 'especialidades/update_all/', to: 'especialidades#update_all', defaults: {format: 'json'}
		delete 'especialidades/:id', to: 'especialidades#delete', defaults: {format: 'json'}
		
		##########################Controladores de tarifas##########################
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
		
		##########################Controladores de parámetros##########################
		get 'parametros/:nombre', to: 'parametros#get_valores', defaults: {format: 'json'}
		put 'parametros/', to: 'parametros#update_all', defaults: {format: 'json'}
		delete 'parametros/:id', to: 'parametros#delete', defaults: {format: 'json'}
		#Controladores valores parametros
		put 'valores_parametros/', to: 'valores_parametros#update_all', defaults: {format: 'json'}
		delete 'valores_parametros/:id', to: 'valores_parametros#delete', defaults: {format: 'json'}
		
		##########################Controladores de otros##########################
		#Controladores procesos examenes
		put 'proceso_examenes/', to: 'proceso_examenes#update_all', defaults: {format: 'json'}
		delete 'proceso_examenes/:id', to: 'proceso_examenes#delete', defaults: {format: 'json'}
		#Controladores procesadores examenes
		put 'procesadores_examenes/', to: 'procesadores_examenes#update_all', defaults: {format: 'json'}
		delete 'procesadores_examenes/:id', to: 'procesadores_examenes#delete', defaults: {format: 'json'}
		#Controladores tipos muestras
		put 'tipos_muestras/', to: 'tipos_muestras#update_all', defaults: {format: 'json'}
		delete 'tipos_muestras/:id', to: 'tipos_muestras#delete', defaults: {format: 'json'}
		#Controladores tipos examen
		put 'tipo_examenes/', to: 'tipo_examenes#update_all', defaults: {format: 'json'}
		delete 'tipo_examenes/:id', to: 'tipo_examenes#delete', defaults: {format: 'json'}
		#Controladores tipos pago
		put 'tipos_pago/', to: 'tipos_pago#update_all', defaults: {format: 'json'}
		delete 'tipos_pago/:id', to: 'tipos_pago#delete', defaults: {format: 'json'}
		#Controladores tipos envases
		put 'tipos_envase/', to: 'tipos_envase#update_all', defaults: {format: 'json'}
		delete 'tipos_envase/:id', to: 'tipos_envase#delete', defaults: {format: 'json'}
		#Controladores tapas tubos
		put 'tapas_tubo/', to: 'tapas_tubo#update_all', defaults: {format: 'json'}
		delete 'tapas_tubo/:id', to: 'tapas_tubo#delete', defaults: {format: 'json'}
		#Controladores indicaciones
		put 'indicaciones/', to: 'indicaciones#update_all', defaults: {format: 'json'}
		delete 'indicaciones/:id', to: 'indicaciones#delete', defaults: {format: 'json'}
		#Controladores de previsiones
		post 'previsiones/range/:start/:number', to: 'previsiones#range', defaults: {format: 'json'}, constraints: { :start=> /[0-9]+/, :number=> /[0-9]+/ } 
		put 'previsiones/', to: 'previsiones#update_all', defaults: {format: 'json'}
		delete 'previsiones/:id', to: 'previsiones#delete', defaults: {format: 'json'}
		get 'previsiones/cantidades_ficha', to: 'previsiones#cantidades_ficha', defaults: {format: 'json'}
		get 'previsiones/cantidades_pacientes', to: 'previsiones#cantidades_pacientes', defaults: {format: 'json'}
		
		resources :alias_examenes, :defaults => { :format => 'json' }
		resources :comunas, :defaults => { :format => 'json' }
		resources :cotizaciones, :defaults => { :format => 'json' }
		resources :detalles_pago_ficha, :defaults => { :format => 'json' }
		resources :detalles_ficha , :defaults => { :format => 'json' }
		resources :especialidades, :defaults => { :format => 'json' }
		resources :examenes, :defaults => { :format => 'json' }
		resources :examenes_parametros, :defaults => { :format => 'json' }
		resources :fichas, :defaults => { :format => 'json' }
		resources :horaproceso_examenes, :defaults => { :format => 'json' }
		resources :indicaciones, :defaults => { :format => 'json' }
		resources :indicaciones_muestra, :defaults => { :format => 'json' }
		resources :instituciones, :defaults => { :format => 'json' }
		resources :medicos, :defaults => { :format => 'json' }
		resources :modificacion_examenes, :defaults => { :format => 'json' }
		resources :pacientes, :defaults => { :format => 'json' }
		resources :parametros, :defaults => { :format => 'json' }
		resources :permisos, :defaults => { :format => 'json' }
		resources :previsiones, :defaults => { :format => 'json' }
		resources :procesadores_examenes, :defaults => { :format => 'json' }
		resources :proceso_examenes, :defaults => { :format => 'json' }
		resources :regiones, :defaults => { :format => 'json' }
		resources :procedencias, :defaults => { :format => 'json' }
		resources :perfiles, :defaults => { :format => 'json' }
		resources :resultados_examen, :defaults => { :format => 'json' }
		resources :tapas_tubo, :defaults => { :format => 'json' }
		resources :tarifas, :defaults => { :format => 'json' }
		resources :tipos_envase , :defaults => { :format => 'json' }
		resources :tipo_examenes, :defaults => { :format => 'json' }
		resources :tipos_muestras, :defaults => { :format => 'json' }
		resources :tipos_pago , :defaults => { :format => 'json' }
		resources :valores_parametros, :defaults => { :format => 'json' }
		
		resources :users, :defaults => { :format => 'json' } do
			collection do
				get 'accountAttributes'
			end
		end
	end

	mount_devise_token_auth_for 'User', at: '/auth', skip: [:omniauth_callbacks], controllers: {
		sessions: 			'overrides/sessions',
		passwords:          'overrides/passwords',
		registrations: 		'overrides/registrations',
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
