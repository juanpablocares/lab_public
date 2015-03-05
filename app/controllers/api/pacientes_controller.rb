class Api::PacientesController < ApplicationController

	def show
		@paciente = Paciente.find(params[:id])
		render json: @paciente
	end

	def search
		@results = Paciente.find_by(rut: params[:rut])
		render json: @results
	end
	
	def search_nombre
		@results = Paciente.find_by(nombre: params[:nombre])
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
		
		respond_to do |format|
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
	end
	
	def update_byrut		
		@paciente = Paciente.find_by(rut: params[:rut])
		@paciente.update_attributes(paciente_params)
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
