class AlterResultadosExamenUsuarios < ActiveRecord::Migration
  def change
	add_column :resultados_examen, :user_id, :integer
	add_foreign_key :resultados_examen, :users, column: :user_id
	
	add_column :resultados_examen, :usuario_valida_id, :integer
	add_foreign_key :resultados_examen, :users, column: :usuario_valida_id
	add_column :resultados_examen, :fecha_usuario_valida, :date
  end
end
