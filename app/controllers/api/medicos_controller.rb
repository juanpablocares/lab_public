class Api::MedicosController < ApplicationController
	def index
		medicos = Medico.all
		render json: {
		          success: true,
		          message: 'Listado de medicos encontrado',
		          data: medicos,
		        }, status: 200
	end
end
