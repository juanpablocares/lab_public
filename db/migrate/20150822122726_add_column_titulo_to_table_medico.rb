class AddColumnTituloToTableMedico < ActiveRecord::Migration
  def change
  	add_column :medicos, :titulo, :string
  end
end
