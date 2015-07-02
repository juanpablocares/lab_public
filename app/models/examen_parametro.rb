class ExamenParametro < ActiveRecord::Base
	belongs_to :parametro
	belongs_to :examen
	
	has_many :resultados_examen, :class_name => 'ResultadoExamen'
	
	self.table_name = "examenes_parametros"
end
