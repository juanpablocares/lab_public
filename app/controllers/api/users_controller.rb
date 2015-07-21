class Api::UsersController < ActionController::Base

	before_filter :authenticate_user!
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
	
	def update_all
		@result = params[:users]
		@result.each do |r|
			@tmp = User.where(id: r["id"]).first
			if @tmp != nil
				@tmp.nombre = r["nombre"]
				@tmp.apellido_paterno = r["apellido_paterno"]
				@tmp.apellido_materno = r["apellido_materno"]
				@tmp.email = r["email"]
				if r["permiso_id"]
					@tmp.permiso_id = r["permiso_id"].to_i
				end
				@tmp.save
			else
				usuario = User.new
				usuario.nombre = r["nombre"]
				usuario.apellido_paterno = r["apellido_paterno"]
				usuario.apellido_materno = r["apellido_materno"]
				usuario.email = r["email"]
				if r["permiso_id"]
					usuario.permiso_id = r["permiso_id"].to_i
				end
				usuario.save
			end
		end
		render json: {
			  success: true,
			  message: 'Usuarios successfully modified',
			}, status: 200
	end
	
	def accountAttributes
		
	end
end
