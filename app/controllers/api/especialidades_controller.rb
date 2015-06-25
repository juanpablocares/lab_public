class Api::EspecialidadesController < ApplicationController
	def index
		@results = Especialidad.all.order(:id)
		render json: {
				  success: true,
				  message: 'Especialidades encontradas',
				  especialidades: @results,
				}, status: 200
	end
	
end
