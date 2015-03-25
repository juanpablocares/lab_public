class Api::TipoExamenesController < ApplicationController
  def index
	render json: TipoExamen.all
  end
end
