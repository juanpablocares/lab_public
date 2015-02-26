class Api::RegionesController < ApplicationController
  def index
	render json: Region.includes(:comunas).all, include:[:comunas]
  end
end
