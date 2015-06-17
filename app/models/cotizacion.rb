class Cotizacion < ActiveRecord::Base
  belongs_to :paciente
  belongs_to :procedencia
  belongs_to :medico
  belongs_to :user
  belongs_to :prevision

  has_many :detalles_cotizacion, :class_name => 'DetalleCotizacion'
  
end