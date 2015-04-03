class Api::TiposPagoController < ApplicationController
	def index
		if @results = TipoPago.all
			render json: {
		          success: true,
		          message: '[index] Tipos de pago encontrados',
		          data: @results,
		        }, status: 200
		end
	end
end
