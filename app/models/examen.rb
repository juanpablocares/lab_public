class Examen < ActiveRecord::Base

	has_many :tarifas_examen , :class_name => 'TarifaExamen' do
	    def find_by_tarifa(id)
	      	find_by("tarifa_id = 3")
	    end
 	end
	
	
	has_many 	:tarifas_examen_por_tarifa_id, -> (tarifa_id){where("tarifas_examen.tarifa_id = ?", tarifa_id)} , :class_name => 'TarifaExamen'
 
	belongs_to 	:indicacion
	belongs_to 	:indicacion_muestra
	belongs_to 	:proceso_examen
	belongs_to 	:procesador_examen
	belongs_to 	:tapa_tubo
	belongs_to 	:tipo_envase
	belongs_to 	:tipo_examen
	belongs_to 	:tipo_muestra

	has_many :alias_examenes
	has_many :horaproceso_examenes
	has_many :detalles_cotizacion, :class_name => 'DetalleCotizacion'

	has_many :examenes_perfil, :class_name => 'ExamenPerfil'
	has_many :perfiles , through: :examenes_perfil

	has_many :sustancias_examen, :class_name => 'SustanciaExamen'
	has_many :sustancias , through: :sustancias_examen

end
