class CreateTableAliasExamenes < ActiveRecord::Migration
  def change
    create_table :alias_examenes do |t|
	  t.integer "examen_id"
	  t.string "nombre"
      t.string "descripcion"
    end
	add_foreign_key :alias_examenes, :examenes, column: :examen_id
  end
end
