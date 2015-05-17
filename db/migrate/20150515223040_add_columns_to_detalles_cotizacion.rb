class AddColumnsToDetallesCotizacion < ActiveRecord::Migration
	def change
		add_column :detalles_cotizacion, :precio, :integer
	end
end
