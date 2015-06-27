class Api::ExamenesParametrosController < ApplicationController
	
	def index
		render json: ExamenParametro.all
	end
	
	def get_parametros
	ep = ExamenParametro.where(examen_id: params[:examen_id]).order(nombre: :asc).all
	if ep
			render json: {
				  success: true,
				  examen_id: params[:examen_id],
				  message: 'Examen Parametros encontrados',
				  examenes_parametros: ep,
				}, status: 200
		end
  end
	
	def delete
		if ExamenParametro.find(params[:id]).destroy
			render json: {
				  success: true,
				  message: 'Examen Parametro successfully deleted',
				}, status: 200
		else
			render json: {
				  success: false,
				  message: 'Error eliminando Examen Parametro',
				}, status: 500
		end
	end
  
  def update_all
		@result = params[:examenes_parametros]
		@result.each do |r|
			@tmp = ExamenParametro.where(id: r["id"]).first
			if @tmp != nil
				@tmp.parametro_id = r["parametro_id"]
				@tmp.examen_id = r["examen_id"]
				@tmp.nombre = r["nombre"]
				@tmp.unidad_medida = r["unidad_medida"]
				@tmp.valor_defecto = r["valor_defecto"]
				@tmp.save
			else
				ep = ExamenParametro.new
				ep.parametro_id = r["parametro_id"].to_i
				ep.examen_id = r["examen_id"]
				ep.nombre = r["nombre"]
				ep.unidad_medida = r["unidad_medida"]
				ep.valor_defecto = r["valor_defecto"]
				ep.save
			end
		end
		render json: {
			  success: true,
			  message: 'Examenes Parametros successfully modified',
			}, status: 200
	end
end