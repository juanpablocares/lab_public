class AlterTableExamenesTipomuestraTipoexamen < ActiveRecord::Migration
  def change
	remove_column :examenes, :tipo_muestra_id, :integer
	rename_column :examenes, :tipo_examen_id, :tipo_muestra_id
	add_column :examenes, :tipo_examen_id, :integer
	add_foreign_key :examenes, :tipo_examenes, column: :tipo_examen_id
  end
end
