class Api::UsersController < ActionController::Base
	before_filter:authenticate_user!
	def index
		render json: User.all
	end
	
	def search
		@results = User.find_by(rut: params[:rut])
		render json: @results
	end
	
	def search_nombre
		@results = User.find_by(nombre: params[:nombre])
		render json: @results
	end
	
	def search_paterno
		@results = User.find_by(apellido_paterno: params[:paterno])
		render json: @results
	end
	
	def search_materno
		@results = User.find_by(apellido_materno: params[:materno])
		render json: @results
	end
	
	def accountAttributes
		render json:
     	[
			{ name: 'Rut', value: '12.312.312-3', editable: 'false', type: 'text' } ,
			{ name: 'Nombre', value: 'Carlos Benner B.', editable: 'false', type: 'text' } ,
			{ name: 'Email', value: 'email@email.com', editable: 'false',	type: 'email' } ,
			{ name: 'Dirección', value: 'Calle falsa 123', editable: 'true', type: 'text' } ,
			{ name: 'Teléfono', value: '123123123', editable: 'true', type: 'text' }
		]
	end
end
