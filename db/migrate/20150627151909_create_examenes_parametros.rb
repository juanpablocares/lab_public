class CreateExamenesParametros < ActiveRecord::Migration
  def change
    create_table :examenes_parametros do |t|
		t.integer	:parametro_id
		t.integer	:examen_id
		t.string	:nombre
		t.string	:unidad_medida
		t.string	:valor_defecto
    end
	add_foreign_key :examenes_parametros, :parametros, column: :parametro_id
	add_foreign_key :examenes_parametros, :examenes, column: :examen_id
  end
end
