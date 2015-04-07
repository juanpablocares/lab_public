class Api::TarifasController < ApplicationController
  def index
	render json: Tarifa.all
  end
  
  def range
				
		if params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:id]
			@results = Tarifa.where(id: params[:search][:predicateObject][:id].to_i)
			@numberOfPages = Tarifa.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200
		elsif params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:codigo] && params[:search][:predicateObject][:codigo_fonasa]
			@results = Tarifa.where("codigo LIKE ? AND codigo_fonasa || '' LIKE ?", "%#{params[:search][:predicateObject][:codigo]}%", "%#{params[:search][:predicateObject][:codigo_fonasa]}%")
			@numberOfPages = Tarifa.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200
		elsif params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:nombre]
			@results = Tarifa.where(Tarifa.arel_table[:nombre].matches("%#{params[:search][:predicateObject][:nombre]}%"))
			@numberOfPages = Tarifa.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200
		elsif params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:codigo_fonasa]
			#@results = Examen.where(Examen.arel_table[:codigo_fonasa].matches("%#{params[:search][:predicateObject][:codigo_fonasa]}%"))
			@results = Tarifa.where("codigo_fonasa || '' LIKE ?", "%#{params[:search][:predicateObject][:codigo_fonasa]}%")
			@numberOfPages = Tarifa.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200, include: [:tramos_examen, :indicacion, :tipo_examen]
		elsif params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:codigo]
			@results = Tarifa.where(Tarifa.arel_table[:codigo].matches("%#{params[:search][:predicateObject][:codigo]}%"))
			@numberOfPages = Tarifa.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200
		else
			@results = Tarifa.limit(params[:number].to_i).offset(params[:start].to_i).order("nombre ASC")
			@numberOfPages = Tarifa.count / params[:number].to_i
			render json: {
				success: true,
				data:  @results,
		        message: 'Resultado correcto',
		        numberOfPages: @numberOfPages,
		    }, status: 200
		end
	end
end
