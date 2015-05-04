class Api::PerfilesController < ApplicationController
	def index
		@perfiles = Perfil.includes(:examenes).all
		render json: {
		          success: true,
		          message: 'Listado de perfiles encontrado',
		          data: @perfiles,
		        }, status: 200,
		        include: [:examenes=> {include: [:tarifas_examen]}]
	end
	
	def filtrar_tarifas
		results = Perfil.includes(:examenes).all.order(:id)
		render json: {
          success: true,
          message: 'Listado de perfiles encontrados con sus tarifas',
          data: results,
        }, status: 200, include: [
        	{:examenes => {include: [:tarifas_examen_por_tarifa_id]}}] 
	end
end