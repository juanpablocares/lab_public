class Parametro < ActiveRecord::Base
	
	has_many :valores_parametros
	
	self.table_name = "parametros"

end