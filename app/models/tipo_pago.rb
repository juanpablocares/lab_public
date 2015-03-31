class TipoPago < ActiveRecord::Base
	has_many :detalles_pago_ficha, :class_name => 'DetallePagosFicha'
	 self.table_name = "tipos_pago"
end
