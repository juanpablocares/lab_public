class TipoMuestra < ActiveRecord::Base
	has_many :examen
	
	self.table_name = "tipos_muestras"
end
