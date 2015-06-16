class CreateTableModificacionesExamenes < ActiveRecord::Migration
  def change
    create_table :modificacion_examenes do |t|
		t.integer :user_id
		t.integer :examen_id
		t.datetime :creacion, :null => false, :default => Time.now
    end
	add_column :examenes, :autorizado_fonasa, :boolean
	add_foreign_key :modificacion_examenes, :users, column: :user_id
	add_foreign_key :modificacion_examenes, :examenes, column: :examen_id
  end
end
