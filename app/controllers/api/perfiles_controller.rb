class Api::PerfilesController < ApplicationController
	def index
		@perfiles = Perfil.includes(:examenes).all
		render json: {
		          success: true,
		          message: 'Listado de perfiles encontrado',
		          data: @perfiles,
		        }, status: 200,
		        include: [:examenes]
	end
end