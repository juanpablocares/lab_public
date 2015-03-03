class Api::PacientesController < ApplicationController

	def index
		render json: Paciente.all
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
	
	def new
		@paciente = Paciente.new
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
	
	def update
		respond_to do |format|
		if @paciente.update(paciente_params)
			format.html { redirect_to @paciente, notice: 'paciente was successfully updated.' }
			format.json { render :show, status: :ok, location: @paciente }
		else
			format.html { render :edit }
			format.json { render json: @paciente.errors, status: :unprocessable_entity }
		end
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
