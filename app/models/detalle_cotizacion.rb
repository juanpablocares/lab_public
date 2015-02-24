class DetalleCotizacion < ActiveRecord::Base
  belongs_to :cotizacion
  belongs_to :examen
  belongs_to :perfil_examen
end
