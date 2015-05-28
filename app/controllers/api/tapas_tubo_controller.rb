class Api::TapasTuboController < ApplicationController
  def index
	render json: TapaTubo.all
  end
end
