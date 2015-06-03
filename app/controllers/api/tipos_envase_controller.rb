class Api::TiposEnvaseController < ApplicationController
  def index
	render json: TipoEnvase.all
  end
  
	def delete
		if TipoEnvase.find(params[:id]).destroy
			render json: {
				  success: true,
				  message: 'TipoEnvase successfully deleted',
				}, status: 200
		else
			render json: {
				  success: false,
				  message: 'Error eliminando TipoEnvase',
				}, status: 500
		end
	end
	
	def update_all
		@result = params[:tipos_envases]
		@result.each do |r|
			@tmp = TipoEnvase.where(id: r["id"]).first
			if @tmp != nil
				@tmp.descripcion = r["descripcion"]
				@tmp.codigo = r["codigo"]
				@tmp.save
			else
				tipo_muestra = TipoEnvase.new
				tipo_muestra.descripcion = r["descripcion"]
				tipo_muestra.codigo = r["codigo"]
				tipo_muestra.save
			end
		end
		render json: {
			  success: true,
			  message: 'TipoEnvase successfully modified',
			}, status: 200
	end
end
