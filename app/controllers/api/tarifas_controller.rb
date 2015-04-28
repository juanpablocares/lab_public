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
		results = Tarifa.all
		
		if(params.has_key?(:search))
			if(params[:search].has_key?(:predicateObject))
				if(params[:search][:predicateObject].has_key?(:id))
					results = results.where(tarifas:{id: params[:search][:predicateObject][:id].to_i})
				end
				if(params[:search][:predicateObject].has_key?(:nombre))
					results = results.where('lower(tarifas.nombre) like ?',"%#{params[:search][:predicateObject][:nombre].downcase}%")
				end
			end
		end
		
		numberOfPages = 1.0 * results.count / params[:number].to_i
		results = results.order(id: :asc).limit(params[:number].to_i).offset(params[:start].to_i)
		render json: {
			  success: true,
			  message: 'Tarifas encontrados',
			  numberOfPages: numberOfPages,
			  data: results,
			}, status: 200
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
