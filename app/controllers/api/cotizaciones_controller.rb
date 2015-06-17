class Api::CotizacionesController < ApplicationController

	before_action :authenticate_user!
	
	def create
		paciente = Paciente.find(params[:paciente_id])
		if paciente == nil
			render json:
			{
				success: false,
	        	message: 'Paciente no encontrado',
	        }, status: 500
	        return false
		end
		medico = nil
		if params.has_key? :medico_id && params[:medico_id]
			medico = Medico.find(params[:medico_id])
			if medico == nil
				render json:
				{
					success: false,
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

		if params[:examenesAgregados] != nil && params[:examenesAgregados].length > 0
			if !cotizacion.save
				raise "Error saving cotizacion"
			else
				params[:examenesAgregados].each do |ex|
					if ex[:perfil]
						ex[:examenes].each do |exa|
							detalle = DetalleCotizacion.new
							detalle.cotizacion_id = cotizacion.id
							detalle.examen_id = exa[:id]
							detalle.perfil_id = ex[:id]
							
							if exa[:tarifa_prevision]
								detalle.precio = exa[:tarifa_prevision][:precio]
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
						if ex[:tarifa_prevision]
								detalle.precio = ex[:tarifa_prevision][:precio]
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
	def show_bypaciente
		cotizaciones = Cotizacion.where(paciente_id: params[:id])
		render json: {
		          success: true,
		          message: '[Paciente] Cotizaciones del paciente indicado encontradas',
		          cotizaciones: cotizaciones,
		        }, status: 200, include: [:medico, :procedencia]
	end
end