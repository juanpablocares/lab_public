class Api::TarifasExamenController < ApplicationController
  def index
	render json: TarifaExamen.all
  end
  
  def show_examen
		if @results = TarifaExamen.where(examen_id: params[:examen_id])
			render json: {
		          success: true,
		          message: 'Tarifa examen encontrado',
		          tarifa_examen: @results,
		        }, status: 200
		else
			render json: {
		          success: false,
		          message: 'Taria examen no encontrado',
		          tarifa_examen: @results,
		        }, status: 500
		end
	end
end
