class Api::TiposEnvaseController < ApplicationController
  def index
	render json: TipoEnvase.all
  end
end
