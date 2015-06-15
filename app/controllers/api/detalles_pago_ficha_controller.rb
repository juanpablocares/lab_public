class Api::DetallesPagoFichaController < ApplicationController
	def create
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

	def range
	
		if params[:facturadas].to_i == 1
			if(params.has_key?(:search) and params[:search].has_key?(:predicateObject) and params[:search][:predicateObject].has_key?(:fecha_inicio) and params[:search][:predicateObject].has_key?(:fecha_fin))
				results = DetallePagoFicha.where('creado BETWEEN ? and ?', params[:search][:predicateObject][:fecha_inicio].to_date.beginning_of_day, params[:search][:predicateObject][:fecha_fin].to_date.end_of_day)
			elsif(params.has_key?(:search) and params[:search].has_key?(:predicateObject) and params[:search][:predicateObject].has_key?(:fecha_inicio))
				results = DetallePagoFicha.where('creado BETWEEN ? and ?', params[:search][:predicateObject][:fecha_inicio].to_date.beginning_of_day, DateTime.now.end_of_day).order(id: :desc)
			elsif(params.has_key?(:search) and params[:search].has_key?(:predicateObject) and params[:search][:predicateObject].has_key?(:fecha_fin))
				results = DetallePagoFicha.where('creado < ?', params[:search][:predicateObject][:fecha_fin].to_date.end_of_day)
			else
				results = DetallePagoFicha.all
			end
		elsif params[:facturadas].to_i == 0
			if(params.has_key?(:search) and params[:search].has_key?(:predicateObject) and params[:search][:predicateObject].has_key?(:fecha_inicio) and params[:search][:predicateObject].has_key?(:fecha_fin))
				results = DetallePagoFicha.where(factura: nil).where('creado BETWEEN ? and ?', params[:search][:predicateObject][:fecha_inicio].to_date.beginning_of_day, params[:search][:predicateObject][:fecha_fin].to_date.end_of_day)
			elsif(params.has_key?(:search) and params[:search].has_key?(:predicateObject) and params[:search][:predicateObject].has_key?(:fecha_inicio))
				results = DetallePagoFicha.where(factura: nil).where('creado BETWEEN ? and ?', params[:search][:predicateObject][:fecha_inicio].to_date.beginning_of_day, DateTime.now.end_of_day)
			elsif(params.has_key?(:search) and params[:search].has_key?(:predicateObject) and params[:search][:predicateObject].has_key?(:fecha_fin))
				results = DetallePagoFicha.where(factura: nil).where('creado < ?', params[:search][:predicateObject][:fecha_fin].to_date.end_of_day).order(id: :desc)
			else
				results = DetallePagoFicha.where(factura: nil).all
			end
		end
		
		results = results.order(id: :desc)
		
		if(params.has_key?(:search))
			if(params[:search].has_key?(:predicateObject))
				if(params[:search][:predicateObject].has_key?(:ficha_id))
					results = results.where(ficha_id: params[:search][:predicateObject][:ficha_id].to_i)
				end
				if(params[:search][:predicateObject].has_key?(:tipos_pago))
					results = results.where(tipo_pago_id: params[:search][:predicateObject][:tipos_pago])
				end
				if(params[:search][:predicateObject].has_key?(:prevision))
					results = results.where(ficha_id: Ficha.where(prevision_id: params[:search][:predicateObject][:prevision]))
				end
			end
		end
		
		numberOfPages = results.count / params[:number].to_i
		results = results.limit(params[:number].to_i).offset(params[:start].to_i)
		render json: {
			  success: true,
			  message: 'Detalle pago sin factura asignada',
			  numberOfPages: numberOfPages,
			  data: results,
			  tipo: params[:facturadas]
			}, status: 200, include: [:tipo_pago, {:ficha => { include: [:prevision, :paciente]}}]
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
	
	def getAllByFicha
		render json: {
			success: true,
			data: Ficha.find(params[:id]).detalles_pago_ficha.includes(:tipo_pago, :user),
	        message: 'Detalle pago ficha creado',
	    }, status: 200, include: [:tipo_pago, :user]
	end

	def detalle_pago_ficha_params
		params.require(:detalle_pago_ficha).permit(:ficha_id, :tipo_pago_id, :monto_pagado, :n_documento, :factura, :user_id)
	end

end
