class AlterTableTramos < ActiveRecord::Migration
  def change
	rename_table :tramos_examen, :tarifas_examen
	rename_table :tramos, :tarifas
	rename_column :tarifas_examen, :tramo_id, :tarifa_id
	add_column :tarifas_examen, :precio_fonasa, :integer
	add_column :previsiones, :tarifa_id, :integer
  end
end
