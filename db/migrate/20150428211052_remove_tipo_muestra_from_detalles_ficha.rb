class RemoveTipoMuestraFromDetallesFicha < ActiveRecord::Migration
  def change
  	  	remove_column :detalles_ficha, :tipo_muestra_id, :integer
  	  	remove_column :detalles_ficha, :tipos_muestra_id, :integer
  end
end
