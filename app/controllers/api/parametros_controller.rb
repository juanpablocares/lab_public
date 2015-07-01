class Api::ParametrosController < ApplicationController
  def index
	result = Parametro.all.order(nombre_visible: :asc)
	render json: {
				  success: true,
				  valor_parametro: params[:nombre],
				  message: 'Valores Parametros encontrados',
				  parametros: result,
				}, status: 200, include: [:valor_parametro]
  end
  
  def get_valores
	p = Parametro.find_by(nombre: params[:nombre])
	if valores = ValorParametro.where(parametro_id: p.id).order(nombre: :asc).all
			render json: {
				  success: true,
				  valor_parametro: params[:nombre],
				  message: 'Valores Parametros encontrados',
				  valores_parametros: valores,
				}, status: 200
		end
  end
end
