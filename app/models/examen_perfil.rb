class ExamenPerfil < ActiveRecord::Base
	belongs_to :examen
	belongs_to :perfil
	self.table_name = "examenes_perfil"
end
