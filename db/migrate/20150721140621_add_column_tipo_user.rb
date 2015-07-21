class AddColumnTipoUser < ActiveRecord::Migration
  def change
	add_column :users, :permiso_id, :integer
	add_foreign_key :users, :permisos, column: :permiso_id
	
	add_column :permisos, :crear_paciente, :boolean, :default => false
	add_column :permisos, :ingresar_resultados, :boolean, :default => false
	add_column :permisos, :validar_resultados, :boolean, :default => false
	add_column :permisos, :valorar_examen, :boolean, :default => false
  end
end
