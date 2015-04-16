class RemoveCodigoFromIndicaciones < ActiveRecord::Migration
  def change
    remove_column :indicaciones, :codigo, :integer
  end
end
