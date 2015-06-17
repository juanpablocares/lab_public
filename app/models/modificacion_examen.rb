class ModificacionExamen < ActiveRecord::Base

	belongs_to	:examenes
	belongs_to	:user

	self.table_name = "modificacion_examenes"
end
