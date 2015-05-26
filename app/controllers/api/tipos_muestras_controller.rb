class Api::TiposMuestrasController < ApplicationController
  def index
	render json: TipoMuestra.all
  end
end
