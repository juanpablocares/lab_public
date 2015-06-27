class ExamenParametro < ActiveRecord::Base
	belongs_to :parametro
	belongs_to :examen
	
	self.table_name = "examenes_parametros"
end
