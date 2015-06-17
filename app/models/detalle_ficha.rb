class DetalleFicha < ActiveRecord::Base
	belongs_to :ficha
	belongs_to :examen
	belongs_to :perfil
	belongs_to :usuario_muestra, :class_name => 'User'

	has_many :resultados_examen, :class_name => 'ResultadoExamen'

	self.table_name = "detalles_ficha"
end
