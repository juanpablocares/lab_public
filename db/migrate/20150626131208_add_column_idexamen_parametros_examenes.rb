class AddColumnIdexamenParametrosExamenes < ActiveRecord::Migration
  def change
	add_column :parametros_examenes, :examen_id, :integer
	add_foreign_key :parametros_examenes, :examenes, column: :examen_id
  end
end
