class Institucion < ActiveRecord::Base
	has_many :medicos
	
	self.table_name = "instituciones"
end
