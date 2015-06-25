class Especialidad < ActiveRecord::Base
	has_many :medicos
	
	self.table_name = "especialidades"
end
