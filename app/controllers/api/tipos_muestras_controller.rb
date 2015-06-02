class Api::TiposMuestrasController < ApplicationController
  def index
	render json: TipoMuestra.all
  end
  
	def delete
		if TipoMuestra.find(params[:id]).destroy
			render json: {
				  success: true,
				  message: 'TipoMuestra successfully deleted',
				}, status: 200
		else
			render json: {
				  success: false,
				  message: 'Error eliminando TipoMuestra',
				}, status: 500
		end
	end
	
	def update_all
		@result = params[:tipos_muestras]
		@result.each do |r|
			@tmp = TipoMuestra.where(id: r["id"]).first
			if @tmp != nil
				@tmp.muestra = r["muestra"]
				@tmp.codigo = r["codigo"]
				@tmp.save
			else
				tipo_muestra = TipoMuestra.new
				tipo_muestra.muestra = r["muestra"]
				tipo_muestra.codigo = r["codigo"]
				tipo_muestra.save
			end
		end
		render json: {
			  success: true,
			  message: 'Tipos Muestras successfully modified',
			}, status: 200
	end
end
