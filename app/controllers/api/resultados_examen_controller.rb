class Api::ResultadosExamenController < ApplicationController

	def get_by_detalle_ficha
		
		results = ResultadoExamen.joins(:detalle_ficha).where(detalles_ficha: {id: params[:id]})
		render json: {
			  success: true,
			  message: 'Resultados examen por detalle ficha encontradas',
			  data: results,
			}, status: 200, include: [:sustancia, :detalle_ficha]
	end
	
	def save_batch_by_detalle_ficha
		if DetalleFicha.find(params[:id])
			params[:sustancias].each do |sustancia|
				if sustancia.has_key?("resultado_id") && sustancia[:cantidad_sustancia] != sustancia[:input_value]
					resultado = ResultadoExamen.find(sustancia[:resultado_id])
					resultado.cantidad_sustancia = sustancia[:input_value]
					if !resultado.save
						render json: {
						  success: false,
						  message: 'Fallo al guardar CAMBIO en resultado examen',
						  data: resultado,
						}, status: 500
					end
				else
					resultado = ResultadoExamen.new
					resultado.detalle_ficha_id = params[:id]
					resultado.sustancia_id = sustancia[:id]
					resultado.cantidad_sustancia = sustancia[:input_value]
					if !resultado.save
						render json: {
						  success: false,
						  message: 'Fallo al guardar NUEVO resultado examen',
						  data: resultado,
						}, status: 500
					end
				end
			end
 			render json: {
			  success: true,
			  message: 'Resultados examen ingresados exitosamente',
			}, status: 200
		else
			render json: {
			  success: false,
			  message: 'Error al buscar detalle ficha',
			  data: results,
			}, status: 500
		end
	end

	def resultados_examen_params
		params.permit(:sustancia_id, :detalle_ficha_id, :cantidad_sustancia, :creado)
	end
end
