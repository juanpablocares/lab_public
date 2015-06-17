class Api::ModificacionExamenesController < ApplicationController
	def index
		render json: ModificacionExamen.all.order(:id)
	end
  
	def show
		if @results = ModificacionExamen.find(params[:id])
			render json: {
		          success: true,
		          message: 'ModificacionExamen encontrado',
		          modificaciones: @results,
		        }, status: 200
		else
			render json: {
		          success: false,
		          message: 'ModificacionExamen no encontrado',
		          modificaciones: @results,
		        }, status: 500
		end
	end
  
	def create
		modificacion = ModificacionExamen.new
		modificacion.user_id = params[:user_id]
		modificacion.examen_id = params[:examen_id]
		modificacion.save
		render json: {
		  success: true,
		  message: 'Modificacion examen successfully created',
		}, status: 200
	end
  
	def findby_examen
		if @results = ModificacionExamen.where(examen_id: params[:examen_id]).all.order(creacion: :desc)
			render json: {
		          success: true,
		          message: 'ModificacionExamen encontrado',
		          modificaciones: @results,
		        }, status: 200, include: [:user]
		else
			render json: {
		          success: false,
		          message: 'ModificacionExamen no encontrado',
		          modificaciones: @results,
		        }, status: 500
		end
	end
  
	def delete
		if ModificacionExamen.find(params[:id]).destroy
			render json: {
				  success: true,
				  message: 'ModificacionExamen successfully deleted',
				}, status: 200
		else
			render json: {
				  success: false,
				  message: 'Error eliminando ModificacionExamen',
				}, status: 500
		end
	end
end
