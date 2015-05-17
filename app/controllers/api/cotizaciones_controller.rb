class Api::CotizacionesController < ApplicationController

	before_action :authenticate_user!
	
	def create
		paciente = Paciente.find(params[:paciente_id])
		if paciente == nil
			render json:
			{
				success: false,
				data:  ficha,
	        	message: 'Paciente no encontrado',
	        }, status: 500
	        return false
		end
		medico = nil
		if params.has_key? :medico_id
			medico = Medico.find(params[:medico_id])
			if medico == nil
				render json:
				{
					success: false,
					data:  ficha,
		        	message: 'Medico no encontrado',
		        }, status: 500
		        return false
			end
		end
		
		cotizacion = Cotizacion.new
		cotizacion.paciente_id = paciente.id

		if medico != nil
			cotizacion.medico_id = medico.id
		end
		
		if params.has_key? :mandar_email
			cotizacion.mandar_email = params[:mandar_email]
		end
		
		if params.has_key? :urgente
			cotizacion.urgente = params[:urgente]
		end
		
		cotizacion.procedencia_id = params[:procedencia_id]
		cotizacion.prevision_id = paciente.prevision_id
		cotizacion.precio_total = params[:precio_total]
		cotizacion.programa = params[:programa]
		cotizacion.numero_programa = params[:numero_programa]
		cotizacion.observaciones = params[:observaciones]
		cotizacion.user_id = current_user.id

		if params[:examenes] != nil && params[:examenes].length > 0
			if !cotizacion.save
				raise "Error saving cotizacion"
			else
				params[:examenes].each do |ex|
					if ex[:perfil]
						ex[:examenes].each do |exa|
							detalle = DetalleCotizacion.new
							detalle.cotizacion_id = cotizacion.id
							detalle.examen_id = exa[:id]
							detalle.perfil_id = ex[:id]
							
							if exa[:tarifas_examen] && exa[:tarifas_examen].size != 0
								detalle.precio = exa[:tarifas_examen][0][:precio]
							else
								detalle.precio = 0
							end
							
							if !detalle.save
								raise "Error saving detalle_cotizacion"
							end
						end
					else
						detalle = DetalleCotizacion.new
						detalle.cotizacion_id = cotizacion.id
						detalle.examen_id = ex[:id]
						detalle.perfil_id = nil
						if ex[:tarifas_examen] && ex[:tarifas_examen].size != 0
								detalle.precio = ex[:tarifas_examen][0][:precio]
						else
							detalle.precio = 0
						end
						if !detalle.save
							raise "Error saving detalle_ficha"
						end
					end
				end
				render json:
				{
					data:  cotizacion,
		        	message: 'cotizacion creada',
		        }, status: 200
			end
		else
			raise "No hay exámenes"
		end
	end
end