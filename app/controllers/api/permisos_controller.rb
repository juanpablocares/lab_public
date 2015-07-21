class Api::PermisosController < ApplicationController
	def index
		if @results = Permiso.all
			render json: {
		          success: true,
		          message: '[index] Permisos encontrados',
		          data: @results,
		        }, status: 200
		end
	end
	
	def delete
		if Permiso.find(params[:id]).destroy
			render json: {
				  success: true,
				  message: 'Permiso successfully deleted',
				}, status: 200
		else
			render json: {
				  success: false,
				  message: 'Error eliminando Permiso',
				}, status: 500
		end
	end
	
	def update
		result = params[:permiso]
		@tmp = Permiso.where(id: params[:id]).first
		if @tmp != nil
			@tmp.nombre = result["nombre"]
			@tmp.crear_paciente = result["crear_paciente"]
			@tmp.ingresar_resultados = result["ingresar_resultados"]
			@tmp.validar_resultados = result["validar_resultados"]
			@tmp.valorar_examen = result["valorar_examen"]
			@tmp.save
		else
			@tmp = Permiso.where(nombre: result["nombre"]).first
			if @tmp != nil
				render json: {
				success: false,
				message: 'Permiso ya existe',
				}, status: 201
			end
			p = Permiso.new
			p.nombre = result["nombre"]
			p.crear_paciente = result["crear_paciente"]
			p.ingresar_resultados = result["ingresar_resultados"]
			p.validar_resultados = result["validar_resultados"]
			p.valorar_examen = result["valorar_examen"]
			p.save
		end
		render json: {
			  success: true,
			  message: 'Permiso successfully modified',
			}, status: 200
	end
end