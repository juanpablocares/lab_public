class AlterResultadosExamenUsuariosContiempo < ActiveRecord::Migration
  def change
	change_column :resultados_examen, :fecha_usuario_valida, :datetime
  end
end
