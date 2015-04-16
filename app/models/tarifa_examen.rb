class TarifaExamen < ActiveRecord::Base
  belongs_to :tarifa
  belongs_to :examen
  
  self.table_name = "tarifas_examen"
end
