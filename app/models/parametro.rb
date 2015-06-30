class Parametro < ActiveRecord::Base
	
	has_many :valor_parametro
	has_many :examen_parametro
	
	self.table_name = "parametros"

end