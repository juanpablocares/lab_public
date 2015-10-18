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

  #def show
    #if @results = Ficha.includes(
        #{:paciente => [:prevision,:comuna]},
        #:medico,
        #:user,
        #:prevision,
        #:procedencia,
        #{:detalles_ficha => [
           #:resultados_examen,
           #:perfil, {
             #:examen => [
               #:indicacion,
               #:tipo_examen,
           #:tarifas_examen]}
      #]})
      #.find(params[:id])
      #render json: {
        #success: true,
        #message: '[show] Ficha encontrada',
        #data: @results,
      #}, status: 200, include: [
        #{:paciente => {include: [:prevision, :comuna]}},
        #:medico,
        #:user,
        #:prevision,
        #:procedencia,
        #{
          #:detalles_ficha => {
            #include: [
              #:usuario_muestra,
              #{
                #:resultados_examen => {
                  #include:
                  #[
                    #{
                      #:examen_parametro => {
                        #include: [
                          #{:parametro => {include: [:valor_parametro]}}
                        #]
                      #}
                    #}
                  #]
                #}
              #},
              #:perfil,
              #{
                #:examen => {
                  #include: [
                    #{
                      #:examenes_parametros => {
                        #include: [
                          #{:parametro => {include: [:valor_parametro]}}
                        #]
                      #}
                    #},
                    #:indicacion,
                    #:tipo_examen,
                    #:tarifas_examen
                  #]
                #}
              #}
            #]
          #}
        #}]
    #end
  #end
  
  def observaciones
	ficha = Ficha.find(params[:id])
	
	if ficha == nil
      render json:
      {
        success: false,
        message: 'Ficha no encontrado',
      }, status: 500
      return false
    end
	
	ficha.observaciones_pagos = params[:observaciones_pagos]
	ficha.save
	
	render json:
      {
        success: true,
        message: 'Ficha actualizada',
      }, status: 200
      return true
  end
  
  def cantidades
	@result = Hash.new
	@annos = Ficha.all.group_by{|m| m.creado.year}
	if @annos != nil
		
		@annos.each do |key_y, y|
			@meses = @annos[key_y].group_by{|m| m.creado.month}
			
			@result_m = Hash.new
			@meses.each do |key_m, m|
				@result_m[key_m] = m.count
			end
			@result[key_y] = @result_m
		end
		
		 render json: {
			success: true,
			message: '[cantidades] Fichas encontradas',
			data: @result,
		  }, status: 200
	end
  end
  
  def input_resultados
	  
	if @results = Ficha.find(params[:id].to_i)
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
      {:detalles_ficha => {include: [
		:usuario_muestra,
		{:resultados_examen => {include: [:usuario_graba, :usuario_valida]}},
		:perfil,
		{:examen => { include: [
			:indicacion,
			:tipo_examen,
			:tarifas_examen,
			{:examenes_parametros => {include: [
				{:parametro => {include: [
					:valor_parametro]}
				}]}
			}]}
		}]}
	  }]
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

	if params[:fecha_anterior] != ''
		results = Ficha.where('creado BETWEEN ? and ?', params[:fecha_anterior].to_date.beginning_of_day, params[:fecha_anterior].to_date.end_of_day).order(id: :desc)
    elsif(params.has_key?(:search) and params[:search].has_key?(:predicateObject) and params[:search][:predicateObject].has_key?(:fecha))
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
    results = Ficha.joins(:paciente).joins(:procedencia).all.order(id: :desc)

    if(params.has_key?(:search))
      if(params[:search].has_key?(:predicateObject))
		if(params[:search][:predicateObject].has_key?(:fecha))
			results = results.where('fichas.creado BETWEEN ? and ?', params[:search][:predicateObject][:fecha].to_date.beginning_of_day, params[:search][:predicateObject][:fecha].to_date.end_of_day)
		end
        if(params[:search][:predicateObject].has_key?(:id))
          results = results.where(id: params[:search][:predicateObject][:id].to_i)
        end
        if(params[:search][:predicateObject].has_key?(:nombre))
          results = results.where("lower(nombre) like ?", "#{params[:search][:predicateObject][:nombre].downcase}%")
        end
		if(params[:search][:predicateObject].has_key?(:procedencia))
          results = results.where(procedencia_id: params[:search][:predicateObject][:procedencia].to_i)
        end
        if(params[:search][:predicateObject].has_key?(:apellido_paterno))
			results = results.where("lower(apellido_paterno) like ?", "#{params[:search][:predicateObject][:apellido_paterno].downcase}%")
        end
        if(params[:search][:predicateObject].has_key?(:apellido_materno))
			results = results.where("lower(apellido_materno) like ?", "#{params[:search][:predicateObject][:apellido_materno].downcase}%")
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
    }, status: 200, include: [:paciente, :medico, :procedencia, :prevision]
  end

end
