class AddColumnValoresParametros < ActiveRecord::Migration
  def change
	add_column :parametros, :codigo, :string
	add_column :parametros, :nombre_visible, :string
	add_column :parametros, :tipo, :string
	add_column :parametros, :valor_defecto, :string
  end
end
