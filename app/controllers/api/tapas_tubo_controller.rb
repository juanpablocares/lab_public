class Api::TapasTuboController < ApplicationController
  def index
	render json: TapaTubo.all
  end
  
	def delete
		if TapaTubo.find(params[:id]).destroy
			render json: {
				  success: true,
				  message: 'TapaTubo successfully deleted',
				}, status: 200
		else
			render json: {
				  success: false,
				  message: 'Error eliminando TapaTubo',
				}, status: 500
		end
	end
	
	def update_all
		@result = params[:tapas_tubo]
		@result.each do |r|
			@tmp = TapaTubo.where(id: r["id"]).first
			if @tmp != nil
				@tmp.descripcion = r["descripcion"]
				@tmp.codigo = r["codigo"]
				@tmp.save
			else
				tapa_tubo = TapaTubo.new
				tapa_tubo.descripcion = r["descripcion"]
				tapa_tubo.codigo = r["codigo"]
				tapa_tubo.save
			end
		end
		render json: {
			  success: true,
			  message: 'TapaTubo successfully modified',
			}, status: 200
	end
end
