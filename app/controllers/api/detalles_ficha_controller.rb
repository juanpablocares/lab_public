class Api::DetalleFichaController < ApplicationController
  def index
	render json: DetalleFicha.all
  end
  
  def muestras
		@results = DetallesFicha.where(:usuario_muestra_id => nil)
		@numberOfPages = Ficha.joins(:detalles_ficha).where(:detalles_ficha => {:usuario_muestra_id => nil}).count / params[:number].to_i
		render json: {
			  success: true,
			  message: 'Muestras encontradas',
			  numberOfPages: @numberOfPages,
			  data: @results,
			}, status: 200
	end
end
