class Api::ComunasController < ApplicationController
  def index
	render json: Comuna.all
  end
end
