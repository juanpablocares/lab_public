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
	
	def delete
		if TipoPago.find(params[:id]).destroy
			render json: {
				  success: true,
				  message: 'TipoPago successfully deleted',
				}, status: 200
		else
			render json: {
				  success: false,
				  message: 'Error eliminando TipoPago',
				}, status: 500
		end
	end
	
	def update_all
		@result = params[:tipos_pago]
		@result.each do |r|
			@tmp = TipoPago.where(id: r["id"]).first
			if @tmp != nil
				@tmp.nombre = r["nombre"]
				@tmp.save
			else
				tipo_muestra = TipoPago.new
				tipo_muestra.nombre = r["nombre"]
				tipo_muestra.save
			end
		end
		render json: {
			  success: true,
			  message: 'Tipos Pagos successfully modified',
			}, status: 200
	end
end
