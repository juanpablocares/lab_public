class UpdateExamenes < ActiveRecord::Migration
  def change
	create_table :"indicaciones" do |t|
      t.string		"tipo", :limit => 5
	  t.integer		"codigo"
      t.text		"descripcion"
    end
	add_column :examenes, :procedencia, :string, :limit => 5
	add_column :examenes, :indicacion_id, :integer
	change_column :examenes, :codigo_fonasa, :string, :limit => 10
  end
end
