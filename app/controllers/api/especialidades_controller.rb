class Api::EspecialidadesController < ApplicationController
	def index
		@results = Especialidad.all.order(:nombre)
		render json: {
				  success: true,
				  message: 'Especialidades encontradas',
				  especialidades: @results,
				}, status: 200
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
				especialidad = Especialidad.new
				especialidad.nombre = r["nombre"]
				especialidad.codigo = r["codigo"]
				especialidad.descripcion = r["descripcion"]
				especialidad.save
			end
		end
		render json: {
			  success: true,
			  message: 'Especialidades successfully modified',
			}, status: 200
	end
end
