class AddColumnsExamenSelects < ActiveRecord::Migration
  def change
	add_column :examenes, :tipo_muestra_id, :integer
	add_foreign_key :examenes, :tipos_muestras, column: :tipo_muestra_id
  end
end
