class ResultadoExamen < ActiveRecord::Base
  belongs_to :examen_parametro
  belongs_to :detalle_ficha
end
