class AddPrecioToDetallesFicha < ActiveRecord::Migration
  def change
  	add_column :detalles_ficha, :precio, :integer
  end
end
