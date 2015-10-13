class AlterFichaNullValues < ActiveRecord::Migration
  def change
	change_column :fichas, :programa, :string, null: true
	change_column :fichas, :numero_programa, :string, null: true
	change_column :fichas, :medico_id, :integer, null: false
  end
end
