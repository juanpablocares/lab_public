class AddTableEspecialidades < ActiveRecord::Migration
  def change
	create_table :"especialidades" do |t|
      t.string		"nombre"
	  t.string 		"codigo"
      t.text		"descripcion"
    end
	add_column :medicos, :especialidad_id, :integer
	add_foreign_key :medicos, :especialidades, column: :especialidad_id
  end
end
