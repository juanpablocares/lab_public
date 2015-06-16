class AddColumnDetallefichaUrgencia < ActiveRecord::Migration
  def change
	add_column :detalles_ficha, :urgente, :boolean
  end
end
