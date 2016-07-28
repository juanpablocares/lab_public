class Especialidad < ActiveRecord::Base
	has_many :medicos
	validates :codigo, presence: true,  uniqueness: {case_sensitive: false} 
	self.table_name = "especialidades"
end
