class Api::IndicacionesMuestraController < ApplicationController
  def index
	render json: IndicacionMuestra.all
  end
end
