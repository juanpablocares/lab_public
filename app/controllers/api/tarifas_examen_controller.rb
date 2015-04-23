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
	
	def update
		@result = params[:tarifas_examen]
		@result.each do |r|
			@tmp = TarifaExamen.where(examen_id: r["examen_id"]).where(tarifa_id: r["tarifa_id"]).first
			@tmp.precio = r[:precio]
			if r[:precio_fonasa] != nil
				@tmp.precio_fonasa = r[:precio_fonasa]
			end
			@tmp.save
		end
		render json: {
			  success: true,
			  message: 'Tarifa Examen successfully modified',
			}, status: 200
	end
	
	def tarifa_examen_params
		params.permit(:tarifa_id, :examen_id, :precio, :precio_fonasa)
	end
end
