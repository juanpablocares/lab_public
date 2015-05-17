class AddColumnsProgramaNumeroProgramaToDetallesCotizacion < ActiveRecord::Migration
  def change
  	
  	add_column :cotizaciones, :programa, :string
	add_column :cotizaciones, :numero_programa, :string
	add_column :cotizaciones, :mandar_email, :boolean
	add_column :cotizaciones, :urgente, :boolean
	
	change_column_null :cotizaciones, :numero_programa, true
    change_column_null :cotizaciones, :programa, true
    
    change_column_default :cotizaciones, :mandar_email, false
	change_column_default :cotizaciones, :urgente, false
  end
end
