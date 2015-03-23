class Api::ProcedenciasController < ApplicationController
	def index
		procedencias = Procedencia.all
		render json: {
		          success: true,
		          message: 'Listado de procedencias encontrado',
		          data: procedencias,
		        }, status: 200
	end
end
