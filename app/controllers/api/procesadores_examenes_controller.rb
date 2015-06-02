class Api::ProcesadoresExamenesController < ApplicationController
  def index
	render json: ProcesadorExamen.all
  end
  
	def delete
		if ProcesadorExamen.find(params[:id]).destroy
			render json: {
				  success: true,
				  message: 'ProcesadorExamen successfully deleted',
				}, status: 200
		else
			render json: {
				  success: false,
				  message: 'Error eliminando ProcesadorExamen',
				}, status: 500
		end
	end
	
	def update_all
		@result = params[:procesadores_examenes]
		@result.each do |r|
			@tmp = ProcesadorExamen.where(id: r["id"]).first
			if @tmp != nil
				@tmp.nombre = r["nombre"]
				@tmp.descripcion = r["descripcion"]
				@tmp.save
			else
				procesador = ProcesadorExamen.new
				procesador.nombre = r["nombre"]
				procesador.descripcion = r["descripcion"]
				procesador.save
			end
		end
		render json: {
			  success: true,
			  message: 'Procesadores Examenes successfully modified',
			}, status: 200
	end
	
	def proceso_examen_params
		params.permit(:nombre, :descripcion)
	end
end
