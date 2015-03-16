class AddTableInstitucionmedico < ActiveRecord::Migration
  def change
	create_table :"instituciones" do |t|
      t.string		"nombre"
	  t.string 		"codigo"
      t.text		"descripcion"
    end
	add_column :medicos, :institucion_id, :integer
	add_column :medicos, :telefono, :string
	add_column :medicos, :direccion, :string
	add_foreign_key :medicos, :instituciones, column: :institucion_id
  end
end
