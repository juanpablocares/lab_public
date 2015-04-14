class DetalleFicha < ActiveRecord::Base
	belongs_to :ficha
	belongs_to :examen
	belongs_to :perfil
	belongs_to :usuario_muestra
	belongs_to :tipo_muestra

	has_many :resultados_examen, :class_name => 'ResultadoExamen'

	self.table_name = "detalles_ficha"
end
