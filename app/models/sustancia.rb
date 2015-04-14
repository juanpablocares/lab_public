class Sustancia < ActiveRecord::Base
	has_many :sustancias_examen, :class_name => 'SustanciaExamen'
	has_many :examenes , through: :sustancias_examen
	
	self.table_name = "sustancias"

end
