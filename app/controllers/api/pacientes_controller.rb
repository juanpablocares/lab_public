class Api::PacientesController < ApplicationController
	def index
		@paciente = Paciente.includes(:prevision, :comuna => [:region]).all
		render json: @paciente.to_json(:methods => [:region, :comuna, :prevision])
	end
	
	def range
		results = Paciente.all
		
		if(params.has_key?(:search))
			if(params[:search].has_key?(:predicateObject))
				if(params[:search][:predicateObject].has_key?(:id))
					results = results.where(id: params[:search][:predicateObject][:id].to_i)
				end
				if(params[:search][:predicateObject].has_key?(:apellido_paterno))
					valor = params[:search][:predicateObject][:apellido_paterno]
					results = results.where("lower(nombre) LIKE ? OR lower(apellido_paterno) LIKE ? OR lower(apellido_materno) LIKE ? ","#{valor}%","#{valor}%","#{valor}%")
				end
				if(params[:search][:predicateObject].has_key?(:prevision))
					results = results.where(prevision_id: params[:search][:predicateObject][:prevision])
				end
			end
		end
		
		numberOfPages = (results.count.to_f / params[:number].to_f).ceil
		results = results.order(id: :asc).limit(params[:number].to_i).offset(params[:start].to_i)
		render json: {
			  success: true,
			  message: 'Pacientes encontrados',
			  numberOfPages: numberOfPages,
			  data: results,
			}, status: 200, include: [:comuna, :prevision]
	end

	def show
		if @paciente = Paciente.includes({:comuna =>[:region]}, :prevision).find(params[:id])
			render json: {
				success: true,
	        	message: '[show] Paciente obtenido',
				data: @paciente
			}, status: 200, include: [{:comuna => {include: [:region]}}, :prevision, :user]
		end
	end

	def show_fichas

		@paciente = Ficha.where(paciente_id: params[:id])
		render json: {
		          success: true,
		          message: 'Paciente encontrado con sus respectivas fichas',
		          fichas: @paciente,
		        }, status: 200
	end

	def update
		@paciente = Paciente.find(params[:id])
		if @paciente.update_attributes(paciente_params)
			render json: {
		          success: true,
		          message: 'Paciente successfully modified',
		          paciente: @paciente,
		        }, status: 200
		else
			render json: {
		          success: false,
		          message: 'Paciente cannot be updated',
		          errors: @paciente.errors,
		        }, status: 500
		end
	end 

	def update_byrut
		@paciente = Paciente.find_by(rut: params[:rut])
		if @paciente.update_attributes(paciente_params)
			render json: {
		          success: true,
		          message: 'Paciente successfully modified',
		          paciente: @paciente,
		        }, status: 200
		else
			render json: {
		          success: false,
		          message: 'Paciente cannot be updated',
		          errors: @paciente.errors,
		        }, status: 500
		end
	end

	def search	
		valor = params[:valor]
		rut = params[:rut]

		if rut!= nil
			valor = rut
		end

		if (valor != nil and valor[0..-2].is_number?)
			if valor.include? "-"
				valor = valor[0..-2]
			end
			results = Paciente.find_by(rut: valor)
		else
			valor = valor.downcase
			results = Paciente.where("lower(nombre) LIKE ? OR lower(apellido_paterno) LIKE ? OR lower(apellido_materno) LIKE ? ","#{valor}%","#{valor}%","#{valor}%")
		end
		render json: {
		  success: true,
		  message: 'Search paciente complete',
		  data: results,
		}, status: 200
	end

	def search_texto
		value = params[:nombre]
		@results = Paciente.joins(:prevision).select('pacientes.*, (rut||rutdv) as rut_completo, previsiones.nombre as prevision_nombre')
		.where("pacientes.nombre LIKE ? OR apellido_paterno LIKE ? OR apellido_materno LIKE ?","#{value}%","#{value}%","#{value}%")
		render json: @results
	end

	def search_nombre
		value = params[:nombre]
		@results = Paciente.where("nombre LIKE ? OR apellido_paterno LIKE ? OR apellido_materno LIKE ?",value,value,value)
		render json: @results
	end

	def search_paterno
		@results = Paciente.find_by(apellido_paterno: params[:paterno])
		render json: @results
	end

	def search_materno
		@results = Paciente.find_by(apellido_materno: params[:materno])
		render json: @results
	end

	def create
		@paciente = Paciente.new(paciente_params)
		if @paciente.save
			render json: {
	          success: true,
	          message: 'Paciente successfully created',
	          data: @paciente,
	        }, status: 200
		else
			render json: {
	          success: false,
	          message: 'Paciente cannot be created',
	          data: @paciente.errors,
	        }, status: 500
		end
	end

	def destroy
		@paciente.destroy
		respond_to do |format|
			format.html { redirect_to pruebas_url, notice: 'paciente was successfully destroyed.' }
			format.json { head :no_content }
		end
	end

	private

	def paciente_params
		params.permit(:rut, :rutdv, :nombre, :apellido_paterno, :apellido_materno, :celular, :direccion, :comuna_id, :fecha_nacimiento, :genero, :diagnostico, :prevision_id, :user_id, :correo, :telefono, :observaciones)
	end
end
