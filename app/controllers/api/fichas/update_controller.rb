class Api::Fichas::UpdateController < Api::FichasController

	def index

    ficha = Ficha.find(params[:id])
    if ficha == nil
      render json:
      {
        success: false,
        message: 'Ficha no encontrado',
      }, status: 500
      return false
    end

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

    #check prevision
    if params.has_key? :prevision
      if params[:prevision][:id] != ficha.prevision_id
        paciente.prevision_id = params[:prevision][:id]
        paciente.save
        ficha.prevision_id = params[:prevision][:id]
      end
    end
    
	if params.has_key? :email
	  ficha.email = params[:email]
	end
    
    if params.has_key? :numero_procedencia and !params[:numero_procedencia].nil?
  		ficha.numero_procedencia = params[:numero_procedencia]
    end

    if params.has_key? :receptor and params[:receptor] != nil
      ficha.receptor = params[:receptor]
    end

    if params.has_key? :mandar_email
      ficha.mandar_email = params[:mandar_email]
    else
      ficha.mandar_email = false
    end

    if params.has_key? :urgente
      ficha.urgente = params[:urgente]
    else
      ficha.urgente = false
    end

    if params.has_key? :observaciones_muestra
      ficha.observaciones_muestra = params[:observaciones_muestra]
    end

    if params.has_key? :diagnostico and params[:diagnostico] != nil
      ficha.diagnostico = params[:diagnostico]
    end

    ficha.procedencia_id = params[:procedencia_id]
    ficha.precio_total = params[:precio_total]
    ficha.programa = params[:programa]
    ficha.numero_programa = params[:numero_programa]
    ficha.observaciones = params[:observaciones]
    ficha.orden_medica_id = nil

    #Borrar examenes eliminados de la ficha
    cant_detalles_ficha = DetalleFicha.count(:conditions => ["ficha_id = ?",ficha.id])
    if (params[:examenesBorrados] != nil and 
      params[:examenesBorrados].length > 0 and 
      params[:examenesBorrados].length < cant_detalles_ficha) or 
      (params[:examenesBorrados] != nil and 
      params[:examenesBorrados].length > 0 and 
      params[:examenesBorrados].length == cant_detalles_ficha and 
      params[:examenesAgregados] != nil and 
      params[:examenesAgregados].length > 0)
      params[:examenesBorrados].each do |borrado|
        if borrado[:perfil]
          detalles_borrados = DetalleFicha.where(ficha_id: ficha.id).where(perfil_id: borrado[:id])
          detalles_borrados.destroy_all
        else
          detalle_borrado = DetalleFicha.find(borrado[:id])
          detalle_borrado.destroy
        end
      end
    end

    if params[:examenesAgregados] != nil and params[:examenesAgregados].length > 0 or cant_detalles_ficha > 0
      if !ficha.save
        raise "Error saving ficha"
      else
        if params[:examenesAgregados] and params[:examenesAgregados].length > 0
          params[:examenesAgregados].each do |ex|
            if ex[:perfil]
              ex[:examenes].each do |exa|
                detalle = DetalleFicha.new
                detalle.ficha_id = ficha.id
                detalle.examen_id = exa[:id]
                detalle.perfil_id = ex[:id]

                if exa[:tarifas_examen] and exa[:tarifas_examen].size != 0
                  detalle.precio = exa[:tarifas_examen][0][:precio]
                else
                  detalle.precio = 0
                end

                examen = Examen.find(detalle.examen_id);
                if examen != nil and examen.codigo_fonasa.length > 3 and examen.codigo_fonasa[1,2] == "07"
                  detalle.usuario_muestra_id = current_user.id
                end

                if !detalle.save
                end
              end
            else
              detalle = DetalleFicha.new
              detalle.ficha_id = ficha.id
              detalle.examen_id = ex[:id]
              detalle.perfil_id = nil

              if ex[:tarifas_examen] and ex[:tarifas_examen].size != 0
                detalle.precio = ex[:tarifas_examen][0][:precio]
              else
                detalle.precio = 0
              end

              examen = Examen.find(detalle.examen_id);
              if examen != nil and examen.codigo_fonasa.length > 3 and examen.codigo_fonasa[1,2] == "07"
                 detalle.usuario_muestra_id = current_user.id
              end

              if !detalle.save
              end
            end
          end
        end
        render json: {
          success: true,
          message: '[Update] Cambios en ficha guardados',
          data: ficha,
          numero_procedencia: params[:numero_procedencia],
          medico_id: params[:medico_id],
        }, status: 200, include: [
          {:paciente => {include: [:prevision, :comuna]}},
          :medico,
          :user,
          :prevision,
          :procedencia,
          :procedencia,
        {
          :detalles_ficha => {
            include: [
              :usuario_muestra,
              {
                :resultados_examen => {
                  include:
                  [
                    {
                      :examen_parametro => {
                        include: [
                          {:parametro => {include: [:valor_parametro]}}
                        ]
                      }
                    }
                  ]
                }
              },
              :perfil,
              {
                :examen => {
                  include: [
                    {
                      :examenes_parametros => {
                        include: [
                          {:parametro => {include: [:valor_parametro]}}
                        ]
                      }
                    },
                    :indicacion,
                    :tipo_examen,
                    :tarifas_examen
                  ]
                }
              }
            ]
          }
        }]
      end
    else
      raise "No hay exámenes"
    end
  end
end
