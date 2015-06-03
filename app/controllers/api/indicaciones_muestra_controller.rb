class Api::IndicacionesMuestraController < ApplicationController
  def index
	render json: IndicacionMuestra.all
  end
  
	def delete
		if IndicacionMuestra.find(params[:id]).destroy
			render json: {
				  success: true,
				  message: 'IndicacionMuestra successfully deleted',
				}, status: 200
		else
			render json: {
				  success: false,
				  message: 'Error eliminando IndicacionMuestra',
				}, status: 500
		end
	end
	
	def update_all
		@result = params[:indicaciones_muestra]
		@result.each do |r|
			@tmp = IndicacionMuestra.where(id: r["id"]).first
			if @tmp != nil
				@tmp.descripcion = r["descripcion"]
				@tmp.codigo = r["codigo"]
				@tmp.save
			else
				indicacion_muestra = IndicacionMuestra.new
				indicacion_muestra.descripcion = r["descripcion"]
				indicacion_muestra.codigo = r["codigo"]
				indicacion_muestra.save
			end
		end
		render json: {
			  success: true,
			  message: 'IndicacionMuestra successfully modified',
			}, status: 200
	end
end
