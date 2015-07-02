class Api::DetallesPagoFichaController < ApplicationController
  def create
    begin
      ficha = Ficha.find(params[:ficha_id])
    rescue ActiveRecord::RecordNotFound
      render json: {error: exception.message}.to_json, status: 404
      return
    end

    if params.has_key? :observaciones_pagos
      ficha.observaciones_pagos = params[:observaciones_pagos]
      ficha.save
    end

    if params.has_key? :monto_pagado and params[:monto_pagado]
      if(DetallePagoFicha.create(detalle_pago_ficha_params))
        render json: {
          success: true,
          message: 'Detalle pago ficha creado',
        }, status: 200
      else
        render json: {
          success: false,
          message: 'Error al crear detalle ficha',
        }, status: 500
      end
    end
  end

  def update
    begin
      detallePago = DetallePagoFicha.find(params[:id])
    rescue ActiveRecord::RecordNotFound => exception
      render json: {error: exception.message}.to_json, status: 404
      return false
    end
    begin
      detallePago.update(detalle_pago_ficha_params)
    rescue ActiveRecord::RecordInvalid => invalid
      render json: {error: invalid.record.errors}.to_json, status: 500
      return false
    end
    render json: {
      success: true,
      data: detallePago,
      message: 'Detalle pago ficha updated',
    }.to_json, status: 200
  end

  def destroy
    begin
      detallePago = DetallePagoFicha.find(params[:id])
    rescue ActiveRecord::RecordNotFound => exception
      render json: {error: exception.message}.to_json, status: 404
      return false
    end
    begin
      detallePago.destroy
    rescue ActiveRecord::RecordInvalid => invalid
      render json: {error: invalid.record.errors}.to_json, status: 500
      return false
    end
    render json: {
      success: true,
      message: 'Detalle pago ficha deleted',
    }.to_json, status: 200
  end



  def range

    if params[:facturadas].to_i == 1
      if(params.has_key?(:search) and params[:search].has_key?(:predicateObject) and params[:search][:predicateObject].has_key?(:fecha_inicio) and params[:search][:predicateObject].has_key?(:fecha_fin))
        results = DetallePagoFicha.where('creado BETWEEN ? and ?', params[:search][:predicateObject][:fecha_inicio].to_time.beginning_of_day, params[:search][:predicateObject][:fecha_fin].to_time)
      elsif(params.has_key?(:search) and params[:search].has_key?(:predicateObject) and params[:search][:predicateObject].has_key?(:fecha_inicio))
        results = DetallePagoFicha.where('creado BETWEEN ? and ?', params[:search][:predicateObject][:fecha_inicio].to_time.beginning_of_day, DateTime.now.end_of_day).order(id: :desc)
      elsif(params.has_key?(:search) and params[:search].has_key?(:predicateObject) and params[:search][:predicateObject].has_key?(:fecha_fin))
        results = DetallePagoFicha.where('creado < ?', params[:search][:predicateObject][:fecha_fin].to_time)
      else
        results = DetallePagoFicha.all
      end
    elsif params[:facturadas].to_i == 0
      if(params.has_key?(:search) and params[:search].has_key?(:predicateObject) and params[:search][:predicateObject].has_key?(:fecha_inicio) and params[:search][:predicateObject].has_key?(:fecha_fin))
        results = DetallePagoFicha.where(factura: nil).where('creado BETWEEN ? and ?', params[:search][:predicateObject][:fecha_inicio].to_time.beginning_of_day, params[:search][:predicateObject][:fecha_fin].to_time)
      elsif(params.has_key?(:search) and params[:search].has_key?(:predicateObject) and params[:search][:predicateObject].has_key?(:fecha_inicio))
        results = DetallePagoFicha.where(factura: nil).where('creado BETWEEN ? and ?', params[:search][:predicateObject][:fecha_inicio].to_time.beginning_of_day, DateTime.now.end_of_day)
      elsif(params.has_key?(:search) and params[:search].has_key?(:predicateObject) and params[:search][:predicateObject].has_key?(:fecha_fin))
        results = DetallePagoFicha.where(factura: nil).where('creado < ?', params[:search][:predicateObject][:fecha_fin].to_time).order(id: :desc)
      else
        results = DetallePagoFicha.where(factura: nil).all
      end
    end

    if(params.has_key?(:search))
      if(params[:search].has_key?(:predicateObject))
        if(params[:search][:predicateObject].has_key?(:ficha_id))
          results = results.where(ficha_id: params[:search][:predicateObject][:ficha_id].to_i)
        end
        if(params[:search][:predicateObject].has_key?(:factura))
          results = results.where(factura: params[:search][:predicateObject][:factura].to_i)
        end
        if(params[:search][:predicateObject].has_key?(:tipos_pago))
          results = results.where(tipo_pago_id: params[:search][:predicateObject][:tipos_pago])
        end
        if(params[:search][:predicateObject].has_key?(:prevision))
          results = results.where(ficha_id: Ficha.where(prevision_id: params[:search][:predicateObject][:prevision]))
        end
        if(params[:search][:predicateObject].has_key?(:procedencia))
          results = results.where(ficha_id: Ficha.where(procedencia_id: params[:search][:predicateObject][:procedencia]))
        end
      end
    end

    results = results.order(ficha_id: :desc).order(tipo_pago_id: :asc)
    numberOfPages = results.count / params[:number].to_i
    results = results.limit(params[:number].to_i).offset(params[:start].to_i)
    render json: {
      success: true,
      message: 'Detalle pago sin factura asignada',
      numberOfPages: numberOfPages,
      data: results,
      tipo: params[:facturadas]
    }, status: 200, include: [:tipo_pago, {:ficha => { include: [:prevision, :paciente, :procedencia, :medico]}}]
  end

  def show
    if detalle = DetallePagoFicha.find(params[:id])
      render json: {
        success: true,
        message: '[show] DetallePagoFicha obtenido',
        data: detalle
      }, status: 200
    end
  end

  def update_all
    @result = params[:detalles_pago_ficha]
    @result.each do |r|
      @tmp = DetallePagoFicha.where(id: r["id"]).first
      if @tmp != nil
        @tmp.factura = r["factura"]
        @tmp.save
      end
    end
    render json: {
      success: true,
      message: 'Detalles pago ficha successfully modified',
    }, status: 200
  end

  def getAllByFicha
    render json: {
      success: true,
      data: Ficha.find(params[:id]).detalles_pago_ficha.includes(:tipo_pago, :user),
      message: 'Detalle pago ficha creado',
    }, status: 200, include: [:tipo_pago, :user]
  end

  def detalle_pago_ficha_params
    params.require(:detalle_pago_ficha).permit(:ficha_id, :tipo_pago_id, :monto_pagado, :n_documento, :factura, :user_id, :creado)
  end
end
