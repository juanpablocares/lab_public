class CreateTableTapasTubo < ActiveRecord::Migration
  def change
    create_table :tapas_tubo do |t|
	  t.string "codigo"
      t.string "descripcion"
    end
	add_column :examenes, :tapa_tubo_id, :integer
	add_foreign_key :examenes, :tapas_tubo, column: :tapa_tubo_id
  end
end
