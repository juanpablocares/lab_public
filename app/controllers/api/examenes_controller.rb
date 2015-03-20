class Api::ExamenesController < ApplicationController
	def index
		@examenes = Examen.all
		render json: {
		          success: true,
		          message: 'Listado de examenes encontrado',
		          data: @examenes,
		        }, status: 200
	end
end
