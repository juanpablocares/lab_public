class Perfil < ActiveRecord::Base
	has_many :examenes_perfil, :class_name => 'ExamenPerfil'
	has_many :detalles_cotizacion, :class_name => 'DetalleCotizacion'
	has_many :examenes, through: :examenes_perfil
end
