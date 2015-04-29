class RemoveExamenFromIndicaciones < ActiveRecord::Migration
  def change
  	remove_column :indicaciones, :examen_id, :integer
  end
end
