class Api::IndicacionesController < ApplicationController
  def index
	render json: Indicacion.all
  end
end
