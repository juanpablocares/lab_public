class Api::PacientesController < ApplicationController
	def index
		@paciente = Paciente.includes(:prevision, :comuna => [:region]).all
		render json: @paciente.to_json(:methods => [:region, :comuna, :prevision])
	end

	def range

		if params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:id]
			@results = Paciente.where(id: params[:search][:predicateObject][:id].to_i)
			@numberOfPages = Paciente.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: @numberOfPages,
		        }, status: 200,
				include: [:comuna, :prevision]
		elsif params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:nombre]
			@results = Paciente.where(Paciente.arel_table[:nombre].matches("%#{params[:search][:predicateObject][:nombre]}%"))
			#@results = Paciente.where("nombre LIKE ?", params[:search][:predicateObject][:nombre])
			@numberOfPages = Paciente.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: @numberOfPages,
		        }, status: 200,
				include: [:comuna, :prevision]
		elsif params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:apellido_paterno]
			@results = Paciente.where(Paciente.arel_table[:apellido_paterno].matches("%#{params[:search][:predicateObject][:apellido_paterno]}%"))
			#@results = Paciente.where("nombre LIKE ?", params[:search][:predicateObject][:nombre])
			@numberOfPages = Paciente.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: @numberOfPages,
		        }, status: 200,
				include: [:comuna, :prevision]
		elsif params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:apellido_materno]
			@results = Paciente.where(Paciente.arel_table[:apellido_materno].matches("%#{params[:search][:predicateObject][:apellido_materno]}%"))
			#@results = Paciente.where("nombre LIKE ?", params[:search][:predicateObject][:nombre])
			@numberOfPages = Paciente.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: @numberOfPages,
		        }, status: 200,
				include: [:comuna, :prevision]
		else
			@results = Paciente.limit(params[:number].to_i).offset(params[:start].to_i).includes(:prevision, :comuna => [:region])
			@numberOfPages = Paciente.count / params[:number].to_i
			render json: {
				success: true,
				data:  @results,
		        message: 'Resultado correcto',
		        numberOfPages: @numberOfPages,
		    }, status: 200,
			include: [:comuna, :prevision]
		end
	end

	def show
		if @paciente = Paciente.includes({:comuna =>[:region]}, :prevision).find(params[:id])
			render json: {
				success: true,
	        	message: '[show] Paciente obtenido',
				data: @paciente
			}, status: 200, include: [{:comuna => {include: [:region]}}, :prevision]
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
		@results = Paciente.find_by(rut: params[:rut])
		render json: @results
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
		params.permit(:rut, :rutdv, :nombre, :apellido_paterno, :apellido_materno, :celular, :direccion, :comuna_id, :fecha_nacimiento, :genero, :diagnostico, :prevision_id, :user_id)
	end
end
