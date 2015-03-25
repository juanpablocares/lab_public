class OrdenMedica < ActiveRecord::Base
  has_one :ficha
  
  belongs_to :paciente
  belongs_to :medico
end
