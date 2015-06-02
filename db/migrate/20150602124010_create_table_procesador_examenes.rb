class CreateTableProcesadorExamenes < ActiveRecord::Migration
  def change
    create_table :procesadores_examenes do |t|
	  t.string "nombre"
      t.string "descripcion"
    end
	add_column :examenes, :procesador_examen_id, :integer
	add_foreign_key :examenes, :procesadores_examenes, column: :procesador_examen_id
  end
end
