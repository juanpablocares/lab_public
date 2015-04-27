class AddPrevisionToFichas < ActiveRecord::Migration
  def change
  	add_reference :fichas, :prevision, index: true
    add_foreign_key :fichas, :previsiones
  end
end
