class Api::FichasController < ApplicationController
  def anno
    @anno = creado.year
  end

  def index
    if @results = Ficha.all
      render json: {
        success: true,
        message: '[index] Fichas encontradas',
        data: @results,
      }, status: 200, include: [:paciente, :medico, :procedencia, :detalles_ficha]
    end
  end

  def show
    if @results = Ficha.includes(
        {:paciente => [:prevision,:comuna]},
        :medico,
        :user,
        :prevision,
        :procedencia,
        {:detalles_ficha => [
           :resultados_examen,
           :perfil, {
             :examen => [
               :indicacion,
               :tipo_examen,
           :tarifas_examen]}
      ]})
      .find(params[:id])
      render json: {
        success: true,
        message: '[show] Ficha encontrada',
        data: @results,
      }, status: 200, include: [
        {:paciente => {include: [:prevision, :comuna]}},
        :medico,
        :user,
        :prevision,
        :procedencia,
      {:detalles_ficha => {include: [:usuario_muestra, :resultados_examen,:perfil,{:examen => { include: [:indicacion, :tipo_examen,:tarifas_examen]}}]}}]
    end
  end

  def pagos
    if @results = DetallePagoFicha.includes(:tipo_pago, :user).where(	ficha_id: params[:id])
      render json: {
        success: true,
        message: '[pagos] Pagos encontrados',
        data: @results,
      }, status: 200, include: [:tipo_pago, :user]
    end
  end

  def show_bypaciente
    @fichas = Ficha.where(paciente_id: params[:id])
    render json: {
      success: true,
      message: '[Paciente] Fichas del paciente indicado encontradas',
      fichas: @fichas,
    }, status: 200, include: [:medico, :procedencia]
  end

  def muestras

    if(params.has_key?(:search) and params[:search].has_key?(:predicateObject) and params[:search][:predicateObject].has_key?(:fecha))
      results = Ficha.where('creado BETWEEN ? and ?', params[:search][:predicateObject][:fecha].to_date.beginning_of_day, params[:search][:predicateObject][:fecha].to_date.end_of_day).order(id: :desc)
    else
      results = Ficha.where('creado BETWEEN ? and ?', DateTime.now.beginning_of_day, DateTime.now.end_of_day).order(id: :desc)
    end

    if(params.has_key?(:search))
      if(params[:search].has_key?(:predicateObject))
        if(params[:search][:predicateObject].has_key?(:ficha_id))
          results = results.where(id: params[:search][:predicateObject][:ficha_id].to_i)
        end
        if(params[:search][:predicateObject].has_key?(:nombre))
          results = results.where(paciente_id: Paciente.where(nombre: params[:search][:predicateObject][:nombre]))
        end
        if(params[:search][:predicateObject].has_key?(:apellido_paterno))
          results = results.where(paciente_id: Paciente.where(apellido_paterno: params[:search][:predicateObject][:apellido_paterno]))
        end
        if(params[:search][:predicateObject].has_key?(:apellido_materno))
          results = results.where(paciente_id: Paciente.where(apellido_materno: params[:search][:predicateObject][:apellido_materno]))
        end
        if(params[:search][:predicateObject].has_key?(:prevision))
          results = results.where(prevision_id: params[:search][:predicateObject][:prevision])
        end

      end
    end

    #@results = Ficha.includes(:detalles_ficha).where(:detalles_ficha => {:usuario_muestra_id => nil})
    #@numberOfPages = Ficha.includes(:detalles_ficha).where(:detalles_ficha => {:usuario_muestra_id => nil}).count / params[:number].to_i

    numberOfPages = results.count / params[:number].to_i
    results = results.limit(params[:number].to_i).offset(params[:start].to_i)
    render json: {
      success: true,
      message: 'Fichas encontradas',
      numberOfPages: numberOfPages,
      data: results,
    }, status: 200, include: [:paciente, :medico, :procedencia, {detalles_ficha: {include: [:usuario_muestra]}}]
  end

  def range
    results = Ficha.joins(:paciente).all.order(id: :desc)

    if(params.has_key?(:search))
      if(params[:search].has_key?(:predicateObject))
        if(params[:search][:predicateObject].has_key?(:id))
          results = results.where(id: params[:search][:predicateObject][:id].to_i)
        end
        if(params[:search][:predicateObject].has_key?(:nombre))
          results = results.where(paciente_id: Paciente.where(nombre: params[:search][:predicateObject][:nombre]))
        end
        if(params[:search][:predicateObject].has_key?(:apellido_paterno))
          results = results.where(:pacientes => {:apellido_paterno => params[:search][:predicateObject][:apellido_paterno]})
        end
        if(params[:search][:predicateObject].has_key?(:apellido_materno))
          results = results.where(Paciente.arel_table[:apellido_materno].matches("%#{params[:search][:predicateObject][:apellido_materno]}%"))
        end
        if(params[:search][:predicateObject].has_key?(:prevision))
          results = results.where(prevision_id: params[:search][:predicateObject][:prevision])
        end

      end
    end

    numberOfPages = (results.count.to_f / params[:number].to_f).ceil
    results = results.limit(params[:number].to_i).offset(params[:start].to_i)
    render json: {
      success: true,
      message: 'Fichas encontradas',
      numberOfPages: numberOfPages,
      data: results,
    }, status: 200, include: [:paciente, :medico]
  end

  def update

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
      ficha.save
      render json:
      {
        success: true,
        data:  ficha,
        message: 'Modificación simple de ficha',
      }, status: 200
      return true
    end

    ficha.procedencia_id = params[:procedencia_id]
    ficha.precio_total = params[:precio_total]
    ficha.programa = params[:programa]
    ficha.numero_programa = params[:numero_programa]
    ficha.observaciones = params[:observaciones]
    ficha.orden_medica_id = nil

    #Borrar examenes eliminados de la ficha
    cant_detalles_ficha = DetalleFicha.count(:conditions => ["ficha_id = ?",ficha.id])
    if params[:examenesBorrados] != nil and params[:examenesBorrados].length > 0 and params[:examenesBorrados].length < cant_detalles_ficha or params[:examenesBorrados] != nil and params[:examenesBorrados].length > 0 and params[:examenesBorrados].length == cant_detalles_ficha and params[:examenesAgregados] != nil and params[:examenesAgregados].length > 0
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
        {:detalles_ficha => {include: [:resultados_examen,:perfil,{:examen => { include: [:indicacion, :tipo_examen,:tarifas_examen]}}]}}]
      end
    else
      raise "No hay exámenes"
    end
  end

  def create
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
