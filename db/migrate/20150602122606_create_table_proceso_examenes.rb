class CreateTableProcesoExamenes < ActiveRecord::Migration
  def change
    create_table :proceso_examenes do |t|
	  t.string "nombre"
      t.string "descripcion"
    end
	add_column :examenes, :proceso_examen_id, :integer
	add_foreign_key :examenes, :proceso_examenes, column: :proceso_examen_id
  end
end
