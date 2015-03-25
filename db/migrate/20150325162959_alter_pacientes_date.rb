class AlterPacientesDate < ActiveRecord::Migration
  def change
	change_column :pacientes, :fecha_nacimiento, :date
  end
end
