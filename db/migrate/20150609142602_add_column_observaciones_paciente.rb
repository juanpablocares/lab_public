class AddColumnObservacionesPaciente < ActiveRecord::Migration
  def change
	add_column :pacientes, :observaciones, :string
  end
end
