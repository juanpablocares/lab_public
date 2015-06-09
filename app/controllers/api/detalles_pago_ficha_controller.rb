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
		results = DetallePagoFicha.where(factura: nil).all
		
		if(params.has_key?(:search))
			if(params[:search].has_key?(:predicateObject))
				if(params[:search][:predicateObject].has_key?(:id))
					results = results.where(id: params[:search][:predicateObject][:id].to_i)
				end
				if(params[:search][:predicateObject].has_key?(:nombre))
					results = results.where(Paciente.arel_table[:nombre].matches("#{params[:search][:predicateObject][:nombre]}%"))
				end
				if(params[:search][:predicateObject].has_key?(:apellido_paterno))
					results = results.where(Paciente.arel_table[:apellido_paterno].matches("#{params[:search][:predicateObject][:apellido_paterno]}%"))
				end
				if(params[:search][:predicateObject].has_key?(:apellido_materno))
					results = results.where(Paciente.arel_table[:apellido_materno].matches("#{params[:search][:predicateObject][:apellido_materno]}%"))
				end
				if(params[:search][:predicateObject].has_key?(:prevision))
					results = results.where(prevision_id: params[:search][:predicateObject][:prevision])
				end
			end
		end
		
		numberOfPages = results.count / params[:number].to_i
		results = results.order(id: :asc).limit(params[:number].to_i).offset(params[:start].to_i)
		render json: {
			  success: true,
			  message: 'Detalle pago sin factura',
			  numberOfPages: numberOfPages,
			  data: results,
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
