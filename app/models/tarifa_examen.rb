class TarifaExamen < ActiveRecord::Base
  belongs_to :tarifa
  belongs_to :examen
end
