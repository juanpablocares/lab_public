class CreateTableHoraprocesoExamenes < ActiveRecord::Migration
  def change
    create_table :horaproceso_examenes do |t|
	  t.integer "examen_id"
	  t.string "hora"
      t.string "descripcion"
    end
	add_foreign_key :horaproceso_examenes, :examenes, column: :examen_id
  end
end
