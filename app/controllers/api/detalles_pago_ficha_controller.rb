class Api::DetallesPagoFichaController < ApplicationController
	def create
		if(DetallePagoFicha.create(detalle_pago_ficha_params))
			render json: {
				success: true,
		        message: 'Detalle pago ficha creado',
		    }, status: 200
		else
			render json: {
				success: false,
		        message: 'Error al crear detalle ficha',
		    }, status: 500
		end
	end

	def getAllByFicha
		render json: {
			success: true,
			data: Ficha.find(params[:id]).detalles_pago_ficha.includes(:tipo_pago),
	        message: 'Detalle pago ficha creado',
	    }, status: 200, include: [:tipo_pago]
	end

	def detalle_pago_ficha_params
		params.require(:detalle_pago_ficha).permit(:ficha_id, :tipo_pago_id, :monto_pagado)
	end

end
