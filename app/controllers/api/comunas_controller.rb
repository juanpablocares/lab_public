class Api::ComunasController < ApplicationController
	
	def index
		render json: Comuna.all
	end

	def buscartest
		@results = Comuna.limit(params[:number].to_i).offset(params[:start].to_i)
		@numberOfPages = Comuna.count / params[:number].to_i
		render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: @numberOfPages,
		        }, status: 200
	end
end
