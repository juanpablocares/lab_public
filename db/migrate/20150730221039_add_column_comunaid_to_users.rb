class AddColumnComunaidToUsers < ActiveRecord::Migration
  def change
	add_column :users, :comuna_id, :integer
	add_foreign_key :users, :comunas, column: :comuna_id
  end
end
