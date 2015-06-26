class CreateTableInheritanceTipoResultados < ActiveRecord::Migration
  def change
	rename_table :sustancias, :parametros_examenes
	drop_table :sustancias_examen
  end
end
