class AddPrecioTotalToFichas < ActiveRecord::Migration
  def change
	add_column :fichas, :precio_total, :integer
  end
end
