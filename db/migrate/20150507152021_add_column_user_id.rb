class AddColumnUserId < ActiveRecord::Migration
  def change
	add_column :detalles_pagos_ficha, :user_id, :integer
	add_reference :detalles_pagos_ficha, :users, index: true
    add_foreign_key :detalles_pagos_ficha, :users
  end
end
