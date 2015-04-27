class Api::TarifasController < ApplicationController
  def index
	render json: Tarifa.order(id: :asc).all
  end
  
  def show
		if @results = Tarifa.find(params[:id])
			render json: {
		          success: true,
		          message: 'Tarifa encontrado',
		          tarifa: @results,
		        }, status: 200
		end
	end
  
	def examenes
		
		sql = "select tarifas.id as tarifa_id, tarifas_examen.precio, tarifas_examen.precio_fonasa, examenes.id as examen_id, examenes.codigo_fonasa, examenes.codigo, examenes.nombre from tarifas FULL JOIN tarifas_examen ON tarifas_examen.tarifa_id = tarifas.id FULL JOIN examenes ON examenes.id = tarifas_examen.examen_id ORDER BY tarifa_id"
		
		render json: ActiveRecord::Base.connection.execute(sql)
		
		#render json: Tarifa.joins('FULL JOIN tarifas_examen ON tarifas.id = tarifas_examen.tarifa_id').joins('FULL JOIN examenes ON examenes.id = tarifas_examen.examen_id')
		
		#render json: Examen.joins('FULL JOIN tarifas_examen ON tarifas_examen.examen_id = examenes.id').joins('FULL JOIN tarifas ON tarifas.id = tarifas_examen.tarifa_id')
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
			@results = Tarifa.limit(params[:number].to_i).offset(params[:start].to_i).order("id ASC")
			@numberOfPages = Tarifa.count / params[:number].to_i
			render json: {
				success: true,
				data:  @results,
		        message: 'Resultado correcto',
		        numberOfPages: @numberOfPages,
		    }, status: 200
		end
	end
	
	def update
		@results = Tarifa.find(params[:id])
		if @results.update_attributes(tarifa_params)
			render json: {
		          success: true,
		          message: 'Tarifa successfully modified',
		          tarifa: @results,
		        }, status: 200
		else
			render json: {
		          success: false,
		          message: 'Tarifa cannot be updated',
		          errors: @results.errors,
		        }, status: 500
		end
	end
	
	def tarifa_params
		params.permit(:nombre, :alerta, :creado)
	end
end
