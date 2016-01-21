class Api::InstitucionesController < ApplicationController
	def index
		@results = Institucion.all.order(:nombre)
		render json: {
				  success: true,
				  message: 'Instituciones encontradas',
				  data: @results,
				}, status: 200
	end
	
	def delete
		if Institucion.find(params[:id]).destroy
			render json: {
				  success: true,
				  message: 'Institucion successfully deleted',
				}, status: 200
		else
			render json: {
				  success: false,
				  message: 'Error eliminando Institucion',
				}, status: 500
		end
	end
	
	def update_all
		@result = params[:instituciones]
		@result.each do |r|
			@tmp = Institucion.where(id: r["id"]).first
			if @tmp != nil
				@tmp.nombre = r["nombre"]
				@tmp.codigo = r["codigo"]
				@tmp.descripcion = r["descripcion"]
				@tmp.save
			else
				institucion = Institucion.new
				institucion.nombre = r["nombre"]
				institucion.codigo = r["codigo"]
				institucion.descripcion = r["descripcion"]
				institucion.save
			end
		end
		render json: {
			  success: true,
			  message: 'Instituciones successfully modified',
			}, status: 200
	end
	
	def show
		if @results = Institucion.find(params[:id])
			render json: {
				  success: true,
				  message: 'Institucion encontrada',
				  data: @results,
				}, status: 200, include: [:especialidad]
		end
	end
	
	def create
		institucion = Institucion.new(institucion_params)
	      
		begin
			institucion.save
		    rescue ActiveRecord::RecordInvalid => invalid
	    	render json: {
	          success: false,
	          message: 'Institucion cannot be created',
	          data: institucion,
	          error: invalid.record.errors
	      	}.to_json, status: 500
	      	return false
	    end
		render json: {
          success: true,
          message: 'Institucion successfully created',
          data: institucion,
        }.to_json, status: 200
        return true
	end
	
	def institucion_params
		params.permit(:codigo, :nombre, :descripcion)
	end
end
