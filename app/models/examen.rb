class Examen < ActiveRecord::Base
	has_many :examenes_perfil, :class_name => 'ExamenPerfil'
	has_many :perfiles , through: :examenes_perfil
end
