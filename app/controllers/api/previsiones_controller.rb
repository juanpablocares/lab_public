class Api::PrevisionesController < ApplicationController
  def index
	render json: Prevision.all
  end
end
