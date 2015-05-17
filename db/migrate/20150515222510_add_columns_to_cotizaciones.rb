class AddColumnsToCotizaciones < ActiveRecord::Migration
	def change
		add_column :cotizaciones, :observaciones, :string
		add_column :cotizaciones, :prevision_id, :integer
		add_foreign_key :cotizaciones, :previsiones
		add_column :cotizaciones, :precio_total, :integer
		add_column :cotizaciones, :medico_id, :integer
		add_foreign_key :cotizaciones, :medicos

		change_column_null :cotizaciones, :precio_total, false
		change_column_null :cotizaciones, :prevision_id, false
		change_column_null :cotizaciones, :medico_id, true
		
	end
end
