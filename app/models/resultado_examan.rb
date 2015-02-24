class ResultadoExaman < ActiveRecord::Base
  belongs_to :sustancia
  belongs_to :detalle_ficha
end
