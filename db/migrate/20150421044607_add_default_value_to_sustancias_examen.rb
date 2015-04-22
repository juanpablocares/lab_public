class AddDefaultValueToSustanciasExamen < ActiveRecord::Migration
	def up
		change_column :sustancias_examen, :created_at, :timestamp, :default => 'now()'
		change_column :sustancias_examen, :updated_at, :timestamp, :default => 'now()'
	end

	def down
		change_column :sustancias_examen, :created_at, :timestamp, :default => nil
		change_column :sustancias_examen, :updated_at, :timestamp, :default => nil
	end

end
