class IndicacionMuestra < ActiveRecord::Base
	has_many :examen
	
	self.table_name = "indicaciones_muestra"
end
