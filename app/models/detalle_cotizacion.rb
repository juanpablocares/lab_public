class DetalleCotizacion < ActiveRecord::Base
	belongs_to :cotizacion
	belongs_to :examen
	belongs_to :perfil
	self.table_name = "detalles_cotizacion"
end
