class Api::PacientesController < ApplicationController
	def show
		@paciente = Paciente.find(params[:id])
		@paciente.region_id = @paciente.comuna.region_id
		render json: @paciente.to_json(:methods => :region_id)
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
		@results = Paciente.find_by(rut: params[:rut])
		render json: @results
	end
	
	def search_texto
		value = params[:nombre]
		@results = Paciente.joins(:prevision).select('pacientes.*, (rut||rutdv) as rut_completo, previsiones.nombre as prevision_nombre').where("pacientes.nombre LIKE ? OR apellido_paterno LIKE ? OR apellido_materno LIKE ?","#{value}%","#{value}%","#{value}%")
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
	          paciente: @paciente,
	        }, status: 200
		else
			render json: {
	          success: false,
	          message: 'Paciente cannot be created',
	          errors: @paciente.errors,
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
		params.permit(:rut, :rutdv, :nombre, :apellido_paterno, :apellido_materno, :celular, :direccion, :comuna_id, :fecha_nacimiento, :genero, :diagnostico, :prevision_id, :user_id)
	end
end
