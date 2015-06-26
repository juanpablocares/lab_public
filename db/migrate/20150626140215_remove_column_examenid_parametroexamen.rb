class RemoveColumnExamenidParametroexamen < ActiveRecord::Migration
  def change
	remove_column :parametros_examenes, :examen_id
	remove_column :resultados_examen, :sustancia_id
	rename_table :parametros_examenes, :parametros
  end
end
