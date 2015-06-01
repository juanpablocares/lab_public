class CreateTableIndicacionesMuestra < ActiveRecord::Migration
  def change
    create_table :indicaciones_muestra do |t|
	  t.string "codigo"
      t.string "descripcion"
    end
	add_column :examenes, :entrega, :string
	add_column :examenes, :indicacion_muestra_id, :integer
	add_foreign_key :examenes, :indicaciones_muestra, column: :indicacion_muestra_id
  end
end
