class AddColumnFolioProcedenciaToFichas < ActiveRecord::Migration
  def change
 	add_column :fichas, :numero_procedencia, :integer
  end
end
