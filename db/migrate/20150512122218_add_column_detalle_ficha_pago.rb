class AddColumnDetalleFichaPago < ActiveRecord::Migration
  def change
	add_column :detalles_pagos_ficha, :n_documento, :integer
	add_column :detalles_pagos_ficha, :factura, :integer
  end
end
