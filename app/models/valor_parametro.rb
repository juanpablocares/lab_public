class ValorParametro < ActiveRecord::Base
	
	belongs_to :parametro
	
	self.table_name = "valores_parametros"
	
end