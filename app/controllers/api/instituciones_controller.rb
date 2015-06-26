class Api::InstitucionesController < ApplicationController
	def index
		@results = Institucion.all.order(:nombre)
		render json: {
				  success: true,
				  message: 'Instituciones encontradas',
				  instituciones: @results,
				}, status: 200
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
end
