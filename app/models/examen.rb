class Examen < ActiveRecord::Base

	has_many	:tarifas_examen, :class_name => 'TarifaExamen'
	belongs_to 	:indicacion
	belongs_to 	:tipo_examen 


	has_many :detalles_cotizacion, :class_name => 'DetalleCotizacion'

	has_many :examenes_perfil, :class_name => 'ExamenPerfil'
	has_many :perfiles , through: :examenes_perfil
	
	has_many :sustancias_examen, :class_name => 'SustanciaExamen'
	has_many :sustancias , through: :sustancias_examen

end
