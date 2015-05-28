class TipoEnvase < ActiveRecord::Base
	has_many :examen
	
	self.table_name = "tipos_envase"
end
