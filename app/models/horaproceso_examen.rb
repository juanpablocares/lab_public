class HoraprocesoExamen < ActiveRecord::Base
	belongs_to :examen
	
	self.table_name = "horaproceso_examenes"
end
