class Api::PrevisionesController < ApplicationController
	def index
		render json: Prevision.all
	end
  
	def show
		if @results = Prevision.find(params[:id])
			render json: {
				  success: true,
				  message: 'Prevision encontrada',
				  prevision: @results,
				}, status: 200, include: [:tarifa]
		end
	end
  
	def range
		results = Prevision.all
		
		if(params.has_key?(:search))
			if(params[:search].has_key?(:predicateObject))
				if(params[:search][:predicateObject].has_key?(:id))
					results = results.where(previsiones:{id: params[:search][:predicateObject][:id].to_i})
				end
				if(params[:search][:predicateObject].has_key?(:nombre))
					results = results.where('lower(previsiones.nombre) like ?',"%#{params[:search][:predicateObject][:nombre].downcase}%")
				end
			end
		end
		
		numberOfPages = 1.0 * results.count / params[:number].to_i
		results = results.order(id: :asc).limit(params[:number].to_i).offset(params[:start].to_i)
		render json: {
			  success: true,
			  message: 'Previsiones encontrados',
			  numberOfPages: numberOfPages,
			  data: results,
			}, status: 200
	end
	
	def update
		@results = Prevision.find(params[:id])
		if @results.update_attributes(prevision_params)
			render json: {
		          success: true,
		          message: 'Prevision successfully modified',
		          prevision: @results,
		        }, status: 200
		else
			render json: {
		          success: false,
		          message: 'Prevision cannot be updated',
		          errors: @results.errors,
		        }, status: 500
		end
	end
	
	def create
		@prevision = Prevision.new(prevision_params)
		if @prevision.save
			render json: {
	          success: true,
	          message: 'Prevision successfully created',
	          data: @prevision,
	        }, status: 200
		else
			render json: {
	          success: false,
	          message: 'Prevision cannot be created',
	          data: @prevision.errors,
	        }, status: 500
		end
	end
	
	def prevision_params
		params.permit(:nombre, :codigo, :habilitada, :creado, :tarifa_id)
	end
end
