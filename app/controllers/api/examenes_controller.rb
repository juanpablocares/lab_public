class Api::ExamenesController < ApplicationController

	def show
		@results = Examen.all
		render json: {
		          success: true,
		          message: 'Examenes encontrados',
		          examenes: @results,
		        }, status: 200, include: [:precios]
	end

	def show_byid
		@results = Examenes.find(id: params[:id])
		render json: {
		          success: true,
		          message: 'Examen encontrado',
		          fichas: @results,
		        }, status: 200
	end
	
	def range
				
		if params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:id]
			@results = Examen.where(id: params[:search][:predicateObject][:id].to_i)
			@numberOfPages = Examen.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200, include: [:precios]
		elsif params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:codigo] && params[:search][:predicateObject][:codigo_fonasa]
			@results = Examen.where("codigo LIKE ? AND codigo_fonasa || '' LIKE ?", "%#{params[:search][:predicateObject][:codigo]}%", "%#{params[:search][:predicateObject][:codigo_fonasa]}%")
			@numberOfPages = Examen.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200, include: [:precios]
		elsif params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:nombre]
			@results = Examen.where(Examen.arel_table[:nombre].matches("%#{params[:search][:predicateObject][:nombre]}%"))
			@numberOfPages = Examen.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200, include: [:precios]
		elsif params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:codigo_fonasa]
			#@results = Examen.where(Examen.arel_table[:codigo_fonasa].matches("%#{params[:search][:predicateObject][:codigo_fonasa]}%"))
			@results = Examen.where("codigo_fonasa || '' LIKE ?", "%#{params[:search][:predicateObject][:codigo_fonasa]}%")
			@numberOfPages = Examen.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200, include: [:precios]
		elsif params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:codigo]
			@results = Examen.where(Examen.arel_table[:codigo].matches("%#{params[:search][:predicateObject][:codigo]}%"))
			@numberOfPages = Examen.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200, include: [:precios]
		else
			@results = Examen.limit(params[:number].to_i).offset(params[:start].to_i).order("nombre ASC")
			@numberOfPages = Examen.count / params[:number].to_i
			render json: {
				success: true,
				data:  @results,
		        message: 'Resultado correcto',
		        numberOfPages: @numberOfPages,
		    }, status: 200, include: [:precios]
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
end
