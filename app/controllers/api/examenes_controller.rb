class Api::ExamenesController < ApplicationController

	def show
		if @results = Examen.find_by_id(params[:id])
			render json: {
		          success: true,
		          message: 'Examen encontrado',
		          examen: @results,
		        }, status: 200, include: [:tarifas_examen, :indicacion, :tipo_examen]
		else
			render json: {
		          success: false,
		          message: 'Examen no encontrado',
		          examen: @results,
		        }, status: 500
		end
	end
	
	def range
		results = Examen.all
		
		if(params.has_key?(:search))
			if(params[:search].has_key?(:predicateObject))
				if(params[:search][:predicateObject].has_key?(:nombre))
					results = results.where('lower(examenes.nombre) like ?',"%#{params[:search][:predicateObject][:nombre].downcase}%")
				end
				if(params[:search][:predicateObject].has_key?(:codigo_fonasa))
					results = results.where('lower(examenes.codigo_fonasa) like ?',"%#{params[:search][:predicateObject][:codigo_fonasa].downcase}%")
				end
				if(params[:search][:predicateObject].has_key?(:codigo))
					results = results.where('lower(examenes.codigo) like ?',"%#{params[:search][:predicateObject][:codigo].downcase}%")
				end
			end
		end
		
		numberOfPages = results.count / params[:number].to_i
		results.order(nombre: :asc).limit(params[:number].to_i).offset(params[:start].to_i)
		render json: {
			  success: true,
			  message: 'Examenes encontrados',
			  numberOfPages: numberOfPages,
			  data: results,
			}, status: 200, include: [:tarifas_examen, :indicaciones, :tipo_examen]
	end

	def index
		@examenes = Examen.all
		render json: {
		          success: true,
		          message: 'Listado de examenes encontrado',
		          data: @examenes,
		        }, status: 200
	end
	
	def select
		#@examenes = Examen.select(:id, :codigo_fonasa, :codigo, :nombre, :tarifas_examen.tarifa_id, :tarifas_examen.precio).includes(:tarifas_examen).all

		@examenes = Examen.select(:id, :codigo_fonasa, :codigo, :nombre).all
		
		render json: {
		          success: true,
		          message: 'Listado de examenes encontrado',
		          examenes: @examenes,
		        }, status: 200, include: [:tarifas_examen]
	end
	
	def update
		@results = Examen.find(params[:id])
		if @results.update_attributes(examen_params)
			render json: {
		          success: true,
		          message: 'Examen successfully modified',
		          examen: @results,
		        }, status: 200
		else
			render json: {
		          success: false,
		          message: 'Examen cannot be updated',
		          errors: @results.errors,
		        }, status: 500
		end
	end
	
	def update_all
		@result = params[:examenes]
		@result.each do |r|
			if r["id"] != nil
				@tmp = Examen.find(r["id"])
				if @tmp != nil
					@tmp.nombre = r[:nombre]
					@tmp.codigo = r[:codigo]
					@tmp.codigo_fonasa = r[:codigo_fonasa]
					@tmp.save
				end
			end
		end
		render json: {
			  success: true,
			  message: 'Examenes successfully modified',
			}, status: 200
	end
	
	def examen_params
		params.permit(:codigo_fonasa, :nombre, :codigo, :externo, :procedencia, :indicacion_id, :tipo_examen_id)
	end
end
