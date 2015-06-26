class Api::ValoresParametrosController < ApplicationController
  def index
	render json: ValorParametro.all
  end
  
  def delete
		if ValorParametro.find(params[:id]).destroy
			render json: {
				  success: true,
				  message: 'ValorP arametro successfully deleted',
				}, status: 200
		else
			render json: {
				  success: false,
				  message: 'Error eliminando Valor Parametro',
				}, status: 500
		end
	end
  
  def update_all
		@result = params[:valores_parametros]
		@result.each do |r|
			@tmp = ValorParametro.where(id: r["id"]).first
			if @tmp != nil
				@tmp.codigo = r["codigo"]
				@tmp.nombre = r["nombre"]
				@tmp.save
			else
				vp = ValorParametro.new
				vp.parametro_id = r["parametro_id"].to_i
				vp.codigo = r["codigo"]
				vp.nombre = r["nombre"]
				vp.save
			end
		end
		render json: {
			  success: true,
			  message: 'Valores Parametros successfully modified',
			}, status: 200
	end
end
