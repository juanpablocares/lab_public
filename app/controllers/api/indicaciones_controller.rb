class Api::IndicacionesController < ApplicationController
  def index
	render json: Indicacion.all.order(:id)
  end
  
	def delete
		if Indicacion.find(params[:id]).destroy
			render json: {
				  success: true,
				  message: 'Indicacion successfully deleted',
				}, status: 200
		else
			render json: {
				  success: false,
				  message: 'Error eliminando Indicacion',
				}, status: 500
		end
	end
	
	def update_all
		@result = params[:indicaciones]
		@result.each do |r|
			@tmp = Indicacion.where(id: r["id"]).first
			if @tmp != nil
				@tmp.descripcion = r["descripcion"]
				@tmp.codigo = r["codigo"]
				@tmp.save
			else
				indicacion = Indicacion.new
				indicacion.descripcion = r["descripcion"]
				indicacion.codigo = r["codigo"]
				indicacion.save
			end
		end
		render json: {
			  success: true,
			  message: 'Indicacion successfully modified',
			}, status: 200
	end
end
