class Ficha < ActiveRecord::Base
	
  belongs_to :paciente
  belongs_to :procedencia
  belongs_to :orden_medica
  belongs_to :usuario_creador
  
  has_many :detalles_ficha, :class_name => 'DetalleFicha'
  has_many :detalles_pago_ficha, :class_name => 'DetallePagosFicha'
  
end
