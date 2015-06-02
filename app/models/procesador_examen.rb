class ProcesadorExamen < ActiveRecord::Base

	has_many	:examenes

	self.table_name = "procesadores_examenes"
end
