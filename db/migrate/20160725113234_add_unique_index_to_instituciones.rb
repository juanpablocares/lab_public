class AddUniqueIndexToInstituciones < ActiveRecord::Migration
  def change
  	add_index :instituciones, :codigo, :unique => true 
  end
end
