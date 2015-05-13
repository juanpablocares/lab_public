class Api::CotizacionesController < ApplicationController

	before_action :authenticate_user!
	def create
		cotizacion = Cotizacion.new
		cotizacion.paciente_id = params[:paciente_id]
		cotizacion.procedencia_id = params[:procedencia_id]
		cotizacion.user_id = current_user.id

		if params[:examenes] != nil && params[:examenes].length > 0
			if !cotizacion.save
				raise "Error saving Cotización"
			else
				params[:examenes].each do |ex|
					if ex[:perfil]
						ex[:examenes].each do |exa|
							detalle = DetalleCotizacion.new
							detalle.cotizacion_id = cotizacion.id
							detalle.examen_id = exa[:id]
							detalle.perfil_examen_id = ex[:id]
							if !detalle.save
								raise "Error saving Cotización"
							end
						end
					else
						detalle = DetalleCotizacion.new
						detalle.cotizacion_id = cotizacion.id
						detalle.examen_id = ex[:id]
						detalle.perfil_examen_id = nil
						if !detalle.save
							raise "Error saving Cotización"
						end
					end
				end
				render json:
				{
					data:  cotizacion,
		        	message: 'Cotizacion creada',
		        }, status: 200
			end
		else
			raise "No hay exámenes"
		end
	end
end