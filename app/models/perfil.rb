class Perfil < ActiveRecord::Base
	has_many :examenes_perfil, :class_name => 'ExamenPerfil'
	has_many :examenes, through: :examenes_perfil
end
