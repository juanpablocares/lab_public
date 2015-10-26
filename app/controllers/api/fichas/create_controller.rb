class Api::Fichas::CreateController < Api::FichasController
	def index
		ficha = Ficha.new
		paciente = Paciente.find(params[:paciente_id])
		if paciente == nil
		  render json:
		  {
			success: false,
			message: 'Paciente no encontrado',
		  }, status: 500
		  return false
		else
		  ficha.paciente_id = paciente.id
		end

		medico = nil
		if params.has_key? :medico_id and params[:medico_id] != nil
		  medico = Medico.find(params[:medico_id])
		  if medico == nil
			render json:
			{
			  success: false,
			  data:  ficha,
			  message: 'Medico no encontrado',
			}, status: 500
			return false
		  else
			ficha.medico_id = medico.id
		  end
		end

		if params.has_key? :receptor
		  ficha.receptor = params[:receptor]
		end
		
		if params.has_key? :email
		  ficha.email = params[:email]
		end

		if params.has_key? :mandar_email
		  ficha.mandar_email = params[:mandar_email]
		end

		if params.has_key? :urgente
		  ficha.urgente = params[:urgente]
		end

		if params.has_key? :numero_procedencia and !params[:numero_procedencia].nil?
			ficha.numero_procedencia = params[:numero_procedencia]
		end

		#check prevision
		if params.has_key? :prevision_id
		  if params[:prevision_id] != paciente.prevision_id
			paciente.prevision_id = params[:prevision_id]
			paciente.save
		  end
		end

		ficha.procedencia_id = params[:procedencia_id]
		ficha.prevision_id = paciente.prevision_id
		ficha.precio_total = params[:precio_total]
		ficha.programa = params[:programa]
		ficha.numero_programa = params[:numero_programa]
		ficha.observaciones = params[:observaciones]
		ficha.orden_medica_id = nil
		ficha.user_id = current_user.id

		if params[:examenesAgregados] != nil and params[:examenesAgregados].length > 0
		  if !ficha.save
			raise "Error saving ficha"
		  else
			params[:examenesAgregados].each do |ex|
			  if ex[:perfil]
				ex[:examenes].each do |exa|
				  detalle = DetalleFicha.new
				  detalle.ficha_id = ficha.id
				  detalle.examen_id = exa[:id]
				  detalle.perfil_id = ex[:id]

				  if exa[:tarifa_prevision]
					detalle.precio = exa[:tarifa_prevision][:precio]
				  else
					detalle.precio = 0
				  end

				  if !detalle.save
					raise "Error saving detalle_ficha"
				  end
				end
			  else
				detalle = DetalleFicha.new
				detalle.ficha_id = ficha.id
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
			  data:  ficha,
			  message: 'ficha creada',
			}, status: 200
		  end
		else
		  raise "No hay exámenes"
		end
    end
end
