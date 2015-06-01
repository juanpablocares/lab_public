class Api::HoraprocesoExamenesController < ApplicationController
  def index
	render json: HoraprocesoExamen.all.order(:id)
  end
  
  def by_examen
	@results = HoraprocesoExamen.find_by(examen_id: params[:examen_id])
	
	render json: {
			success: true,
			message: 'Hora proceso examen encontrado',
			horaproceso_examen: @results,
		}, status: 200
  end
  
  def update_all
		@result = params[:horaproceso_examen]
		@result.each do |r|
			@tmp = HoraprocesoExamen.where(examen_id: r["examen_id"]).where(id: r["id"]).first
			if @tmp != nil
				@tmp.hora = r["hora"]
				@tmp.descripcion = r["descripcion"]
				@tmp.save
			else
				horaproceso = HoraprocesoExamen.new
				horaproceso.examen_id = r["examen_id"]
				horaproceso.hora = r["hora"]
				horaproceso.descripcion = r["descripcion"]
				horaproceso.save
			end
		end
		render json: {
			  success: true,
			  message: 'Horaproceso examen successfully modified',
			}, status: 200
	end
end