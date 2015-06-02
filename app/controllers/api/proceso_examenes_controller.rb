class Api::ProcesoExamenesController < ApplicationController
  def index
	render json: ProcesoExamen.all.order(:id)
  end
  
	def delete
		if ProcesoExamen.find(params[:id]).destroy
			render json: {
		          success: true,
		          message: 'Proceso examen successfully deleted',
		        }, status: 200
		else
			render json: {
		          success: false,
		          message: 'Error eliminando Proceso examen',
		        }, status: 500
		end
	end
  
	def create
		@proceso_examen = ProcesoExamen.new(proceso_examen_params)
		if @proceso_examen.save
			render json: {
			  success: true,
			  message: 'Proceso_examen successfully created',
			  data: @proceso_examen,
			}, status: 200
		else
			render json: {
			  success: false,
			  message: 'Proceso_examen cannot be created',
			  data: @proceso_examen.errors,
			}, status: 500
		end
	end
  
  def update
		@proceso_examen = ProcesoExamen.find(params[:id])
		if @proceso_examen.update_attributes(proceso_examen_params)
			render json: {
		          success: true,
		          message: 'Proceso examen successfully modified',
		          proceso_examen: @proceso_examen,
		        }, status: 200
		else
			tmp = ProcesoExamen.new
			tmp.nombre = params[:nombre]
			tmp.descripcion = params[:descripcion]
			render json: {
		          success: true,
		          message: 'Proceso examen successfully created',
		          proceso_examen: @proceso_examen,
		        }, status: 200
		end
	end 
  
  def update_all
		@result = params[:proceso_examenes]
		@result.each do |r|
			@tmp = ProcesoExamen.where(id: r["id"]).first
			if @tmp != nil
				@tmp.nombre = r["nombre"]
				@tmp.descripcion = r["descripcion"]
				@tmp.save
			else
				proceso = ProcesoExamen.new
				proceso.nombre = r["nombre"]
				proceso.descripcion = r["descripcion"]
				proceso.save
			end
		end
		render json: {
			  success: true,
			  message: 'Alias Examen successfully modified',
			}, status: 200
	end
	
	def proceso_examen_params
		params.permit(:nombre, :descripcion)
	end
end
