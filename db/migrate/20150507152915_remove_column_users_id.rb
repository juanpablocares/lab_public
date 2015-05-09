class RemoveColumnUsersId < ActiveRecord::Migration
  def change
	remove_column :detalles_pagos_ficha, :users_id, :integer
  end
end
