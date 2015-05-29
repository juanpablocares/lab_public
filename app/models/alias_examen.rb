class AliasExamen < ActiveRecord::Base
	belongs_to :examen
	
	self.table_name = "alias_examenes"
end
