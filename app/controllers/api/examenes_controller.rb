class Api::ExamenesController < ApplicationController

	def show
		if @results = Examen.find(params[:id])
			render json: {
		          success: true,
		          message: 'Examen encontrado',
		          examen: @results,
		        }, status: 200, include: [:tramos_examen, :indicacion, :tipo_examen]
		end
	end
	
	def range
				
		if params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:id]
			@results = Examen.where(id: params[:search][:predicateObject][:id].to_i)
			@numberOfPages = Examen.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200, include: [:tramos_examen, :indicacion, :tipo_examen]
		elsif params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:codigo] && params[:search][:predicateObject][:codigo_fonasa]
			@results = Examen.where("codigo LIKE ? AND codigo_fonasa || '' LIKE ?", "%#{params[:search][:predicateObject][:codigo]}%", "%#{params[:search][:predicateObject][:codigo_fonasa]}%")
			@numberOfPages = Examen.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200, include: [:tramos_examen, :indicacion, :tipo_examen]
		elsif params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:nombre]
			@results = Examen.where(Examen.arel_table[:nombre].matches("%#{params[:search][:predicateObject][:nombre]}%"))
			@numberOfPages = Examen.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200, include: [:tramos_examen, :indicacion, :tipo_examen]
		elsif params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:codigo_fonasa]
			#@results = Examen.where(Examen.arel_table[:codigo_fonasa].matches("%#{params[:search][:predicateObject][:codigo_fonasa]}%"))
			@results = Examen.where("codigo_fonasa || '' LIKE ?", "%#{params[:search][:predicateObject][:codigo_fonasa]}%")
			@numberOfPages = Examen.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200, include: [:tramos_examen, :indicacion, :tipo_examen]
		elsif params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:codigo]
			@results = Examen.where(Examen.arel_table[:codigo].matches("%#{params[:search][:predicateObject][:codigo]}%"))
			@numberOfPages = Examen.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200, include: [:tramos_examen, :indicacion, :tipo_examen]
		else
			@results = Examen.limit(params[:number].to_i).offset(params[:start].to_i).order("nombre ASC")
			@numberOfPages = Examen.count / params[:number].to_i
			render json: {
				success: true,
				data:  @results,
		        message: 'Resultado correcto',
		        numberOfPages: @numberOfPages,
		    }, status: 200, include: [:tramos_examen, :indicacion, :tipo_examen]
		end
	end

	def index
		@examenes = Examen.all
		render json: {
		          success: true,
		          message: 'Listado de examenes encontrado',
		          data: @examenes,
		        }, status: 200
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
	
	def examen_params
		params.permit(:codigo_fonasa, :nombre, :codigo, :externo, :procedencia, :indicacion_id, :tipo_examen_id)
	end
end
