class AddColumnGeneroToTableMedico < ActiveRecord::Migration
  def change
  	add_column :medicos, :genero, :integer ,:default => 1
  end
end
