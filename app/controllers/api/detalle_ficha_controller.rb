class Api::DetalleFichaController < ApplicationController
	def index
	render json: DetalleFicha.all
	end
  
	def show
		if @results = DetalleFicha.find(params[:id])
			render json: {
		          success: true,
		          message: 'Detalles Ficha encontrado',
		          detalle_ficha: @results,
		        }, status: 200
		end
	end
	
	def update
		@results = DetalleFicha.find(params[:id])
		if @results.update_attributes(detalle_ficha_params)
			render json: {
		          success: true,
		          message: 'Detalle ficha successfully modified',
		          detalle_ficha: @results,
		        }, status: 200
		else
			render json: {
		          success: false,
		          message: 'Detalle ficha cannot be updated',
		          errors: @results.errors,
		        }, status: 500
		end
	end
	
	def detalle_ficha_params
		params.permit(:examen_id, :perfil_id, :usuario_muestra_id, :fecha_muestra, :tipo_muestra_id)
	end
end
