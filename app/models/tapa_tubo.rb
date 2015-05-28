class TapaTubo < ActiveRecord::Base
	has_many :examen
	
	self.table_name = "tapas_tubo"
end
