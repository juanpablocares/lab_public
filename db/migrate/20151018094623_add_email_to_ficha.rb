class AddEmailToFicha < ActiveRecord::Migration
  def change
  	add_column :fichas, :email, :string
  end
end
