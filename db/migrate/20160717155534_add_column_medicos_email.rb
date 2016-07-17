class AddColumnMedicosEmail < ActiveRecord::Migration
  def change
	add_column :medicos, :email, :string
	add_column :medicos, :celular, :string
	add_column :medicos, :comuna_id, :integer
	add_foreign_key :medicos, :comunas, column: :comuna_id
  end
end
