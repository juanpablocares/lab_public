class AlterResultadosExamen < ActiveRecord::Migration
  def change
	add_column :resultados_examen, :examen_parametro_id, :integer
	add_foreign_key :resultados_examen, :examenes_parametros, column: :examen_parametro_id
	rename_column :resultados_examen, :cantidad_sustancia, :cantidad
	change_column :resultados_examen, :cantidad, :string
  end
end
