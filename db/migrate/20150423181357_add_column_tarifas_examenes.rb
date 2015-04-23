class AddColumnTarifasExamenes < ActiveRecord::Migration
  def change
	add_column :tarifas_examen, :id, :primary_key
  end
end
