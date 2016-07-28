class Api::EspecialidadesController < ApplicationController
	def index
		@results = Especialidad.all.order(:nombre)
		render json: {
				  success: true,
				  message: 'Especialidades encontradas',
				  data: @results,
				}, status: 200
	end
	
	def delete
		if Especialidad.find(params[:id]).destroy
			render json: {
				  success: true,
				  message: 'Especialidad successfully deleted',
				}, status: 200
		else
			render json: {
				  success: false,
				  message: 'Error eliminando Especialidad',
				}, status: 500
		end
	end
	
	def update_all
		@result = params[:especialidades]
		@result.each do |r|
			@tmp = Especialidad.where(id: r["id"]).first
			if @tmp != nil
				@tmp.nombre = r["nombre"]
				@tmp.codigo = r["codigo"]
				@tmp.descripcion = r["descripcion"]
				@tmp.save
			else
				if !Especialidad.exists?("lower(codigo) = ? ",r["codigo"].downcase)
					especialidad = Especialidad.new
					especialidad.nombre = r["nombre"]
					especialidad.codigo = r["codigo"]
					especialidad.descripcion = r["descripcion"]
					especialidad.save
				end
			end
		end
		render json: {
			  success: true,
			  message: 'Especialidades successfully modified',
			}, status: 200
	end
	
	def show
		if @results = Especialidad.find(params[:id])
			render json: {
				  success: true,
				  message: 'Especialidad encontrada',
				  data: @results,
				}, status: 200, include: [:especialidad]
		end
	end
	
	def create
		especialidad = Especialidad.new(especialidad_params)
	    if Especialidad.exists?("lower(codigo) = ? ",r["codigo"].downcase)
	    	render json: {
	          success: false,
	          message: 'codigo_existe',
	          data: especialidad,
	      	}.to_json, status: 500
	      	return false
	    end
		begin
			especialidad.save
		    rescue ActiveRecord::RecordInvalid => invalid
	    	render json: {
	          success: false,
	          message: 'Especialidad cannot be created',
	          data: especialidad,
	          error: invalid.record.errors
	      	}.to_json, status: 500
	      	return false
	    end
		render json: {
          success: true,
          message: 'Especialidad successfully created',
          data: especialidad,
        }.to_json, status: 200
        return true
	end
	
	def especialidad_params
		params.permit(:codigo, :nombre, :descripcion)
	end
end
