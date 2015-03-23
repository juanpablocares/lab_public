class Api::FichasController < ApplicationController

	def show_bypaciente
		@fichas = Ficha.where(paciente_id: params[:id])
		render json: {
		          success: true,
		          message: 'Paciente encontrado con sus respectivas fichas',
		          fichas: @fichas,
		        }, status: 200
	end
	
	def range
				
		if params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:id]
			@results = Ficha.where(id: params[:search][:predicateObject][:id].to_i)
			@numberOfPages = @results.length / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: 0
		        }, status: 200
		else
			@results = Ficha.limit(params[:number].to_i).offset(params[:start].to_i)
			@numberOfPages = @results.length / params[:number].to_i
			render json: {
				success: true,
				data:  @results,
		        message: 'Resultado correcto',
		        numberOfPages: @numberOfPages,
		    }, status: 200,
			include: [:comuna, :prevision]
		end
	end
end
