class Api::FichasController < ApplicationController

	def show_bypaciente
		@fichas = Ficha.where(paciente_id: params[:id])
		render json: {
		          success: true,
		          message: 'Paciente encontrado con sus respectivas fichas',
		          fichas: @fichas,
		        }, status: 200
	end
	
end
