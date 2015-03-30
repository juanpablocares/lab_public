class OrdenMedica < ActiveRecord::Base
  has_one :ficha
  
  belongs_to :paciente
  belongs_to :medico
  
  self.table_name = "ordenes_medicas"
end
