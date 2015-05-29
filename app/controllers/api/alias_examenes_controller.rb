class Api::AliasExamenesController < ApplicationController
  def index
	render json: AliasExamen.all.order(:id)
  end
  
  def by_examen
	@results = AliasExamen.find_by(examen_id: params[:examen_id])
	
	render json: {
			success: true,
			message: 'Alias examen encontrado',
			alias_examen: @results,
		}, status: 200
  end
  
  def update_all
		@result = params[:alias_examen]
		@result.each do |r|
			@tmp = AliasExamen.where(examen_id: r["examen_id"]).where(id: r["id"]).first
			if @tmp != nil
				@tmp.nombre = r["nombre"]
				@tmp.descripcion = r["descripcion"]
				@tmp.save
			else
				alias_exam = AliasExamen.new
				alias_exam.examen_id = r["examen_id"]
				alias_exam.nombre = r["nombre"]
				alias_exam.descripcion = r["descripcion"]
				alias_exam.save
			end
		end
		render json: {
			  success: true,
			  message: 'Alias Examen successfully modified',
			}, status: 200
	end
end
