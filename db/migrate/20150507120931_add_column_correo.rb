class AddColumnCorreo < ActiveRecord::Migration
  def change
	add_column :pacientes, :correo, :string
  end
end
