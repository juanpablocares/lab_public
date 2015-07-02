class Api::ResultadosExamenController < ApplicationController

	def get_by_detalle_ficha
		
		results = ResultadoExamen.joins(:detalle_ficha).where(detalles_ficha: {id: params[:id]})
		render json: {
			  success: true,
			  message: 'Resultados examen por detalle ficha encontradas',
			  data: results,
			}, status: 200, include: [:sustancia, {:detalle_ficha=> {include: [:examen]}}]
	end
	
	def get_resultado
		result = ResultadoExamen.where(examen_parametro_id: params[:examen_parametro_id], detalle_ficha_id: params[:detalle_ficha_id])
		if !(result.empty?)
			render json: {
				  success: true,
				  message: 'Resultados examen encontrado',
				  data: result.first,
				}, status: 200
		elsif
			render json: {
			  success: false,
			  message: 'Resultados examen no encontrado',
			}, status: 200
		end
	end
	
	def update_resultado
		result = ResultadoExamen.where(examen_parametro_id: params[:examen_parametro_id], detalle_ficha_id: params[:detalle_ficha_id]).first
		r = params[:resultado]
		if result != nil
			result.detalle_ficha_id = r["detalle_ficha_id"]
			result.examen_parametro_id = r["examen_parametro_id"]
			result.cantidad = r["cantidad"]
			result.user_id = r["user_id"]
			result.creado = Time.now
			result.save
			render json: {
				  success: true,
				  message: 'Resultado actualizado',
				  data: result,
				}, status: 200
		elsif
			resultado = ResultadoExamen.new
			resultado.detalle_ficha_id = r["detalle_ficha_id"]
			resultado.examen_parametro_id = r["examen_parametro_id"]
			resultado.cantidad = r["cantidad"]
			resultado.user_id = r["user_id"]
			resultado.save
			render json: {
			  success: true,
			  message: 'Resultado nuevo ingresado',
			  data: resultado,
			}, status: 200
		end
	end
	
	def update_validar_resultado
		result = ResultadoExamen.where(examen_parametro_id: params[:examen_parametro_id], detalle_ficha_id: params[:detalle_ficha_id]).first
		r = params[:resultado]
		if result != nil
			result.detalle_ficha_id = r["detalle_ficha_id"]
			result.examen_parametro_id = r["examen_parametro_id"]
			result.usuario_valida_id = r["usuario_valida_id"]
			result.fecha_usuario_valida = Time.now
			result.save
			render json: {
				  success: true,
				  message: 'Validado el resultado',
				  data: result,
				}, status: 200
		elsif
			render json: {
			  success: true,
			  message: 'Validando resultado nuevo ',
			  data: resultado,
			}, status: 500
		end
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
		params.permit(:examen_parametro_id, :detalle_ficha_id, :cantidad, :user_id, :creado, :usuario_valida_id, :fecha_usuario_valida)
	end
end
