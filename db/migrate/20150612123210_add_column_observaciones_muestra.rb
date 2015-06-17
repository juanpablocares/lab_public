class AddColumnObservacionesMuestra < ActiveRecord::Migration
  def change
	add_column :fichas, :observaciones_muestra, :string
	add_column :fichas, :diagnostico, :string
  end
end
