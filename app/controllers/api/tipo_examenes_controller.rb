class Api::TipoExamenesController < ApplicationController
  def index
	render json: TipoExamen.all
  end
  
	def delete
		if TipoExamen.find(params[:id]).destroy
			render json: {
				  success: true,
				  message: 'TipoExamen successfully deleted',
				}, status: 200
		else
			render json: {
				  success: false,
				  message: 'Error eliminando TipoExamen',
				}, status: 500
		end
	end
	
	def update_all
		@result = params[:tipo_examenes]
		@result.each do |r|
			@tmp = TipoExamen.where(id: r["id"]).first
			if @tmp != nil
				@tmp.nombre = r["nombre"]
				@tmp.codigo = r["codigo"]
				@tmp.save
			else
				tipo_muestra = TipoExamen.new
				tipo_muestra.nombre = r["nombre"]
				tipo_muestra.codigo = r["codigo"]
				tipo_muestra.save
			end
		end
		render json: {
			  success: true,
			  message: 'TipoExamen successfully modified',
			}, status: 200
	end
end
