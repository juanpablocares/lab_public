class Parametro < ActiveRecord::Base
	
	has_many :valores_parametros
	has_many :examenes_parametros
	
	self.table_name = "parametros"

end