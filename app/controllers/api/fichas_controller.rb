class Api::FichasController < ApplicationController

	#Porque no recobrar las fichas desde paciente/:id/fichas ?
	#Sería mas descriptivo el nombre que fichas/showbypaciente/:id
	def show_bypaciente
		@fichas = Ficha.where(paciente_id: params[:id])
		render json: {
		          success: true,
		          message: 'Paciente encontrado con sus respectivas fichas',
		          fichas: @fichas,
		        }, status: 200
	end
	
	
	
end
