class AddColumnObservacionesPagosToFicha < ActiveRecord::Migration
  def change
   	add_column :fichas, :observaciones_pagos, :string	
  end
end
