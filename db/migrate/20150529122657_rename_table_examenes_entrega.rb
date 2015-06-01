class RenameTableExamenesEntrega < ActiveRecord::Migration
  def change
	rename_column :examenes, :entrega, :demora
  end
end
