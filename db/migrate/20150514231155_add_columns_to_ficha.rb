class AddColumnsToFicha < ActiveRecord::Migration
  def change
	add_column :fichas, :receptor, :string
	add_column :fichas, :programa, :string
	add_column :fichas, :numero_programa, :string
	add_column :fichas, :mandar_email, :boolean
	add_column :fichas, :urgente, :boolean
	add_column :fichas, :medico_id, :integer
    add_foreign_key :fichas, :medicos
    
    change_column_null :fichas, :numero_programa, false
    change_column_null :fichas, :programa, false
    
    change_column_null :fichas, :precio_total, false
    change_column_null :fichas, :prevision_id, false
    change_column_null :fichas, :medico_id, true
	change_column_null :fichas, :receptor, true

	change_column_default :fichas, :mandar_email, false
	change_column_default :fichas, :medico_id, :null
	change_column_default :fichas, :urgente, false
  end
end
