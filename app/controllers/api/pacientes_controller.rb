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
	
	def create
		@paciente = paciente.new(paciente_params)

		respond_to do |format|
			if @paciente.save
				format.html { redirect_to @paciente, notice: 'paciente was successfully created.' }
				format.json { render :show, status: :created, location: @paciente }
			else
				format.html { render :new }
				format.json { render json: @paciente.errors, status: :unprocessable_entity }
			end
		end
	end
	
	def create
		@paciente = Paciente.new(params[:nombre])
	end
	
  private
	def paciente_params
      params.require(:paciente).permit(:rut, :rutdv, :nombre, :apellido_paterno, :apellido_materno, :celular, :direccion, :comuna_id, :fecha_nacimiento, :genero, :diagnostico, :prevision_id, :user_id)
    end
end
