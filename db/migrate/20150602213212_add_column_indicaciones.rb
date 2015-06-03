class AddColumnIndicaciones < ActiveRecord::Migration
  def change
	add_column :indicaciones, :codigo, :string
  end
end
