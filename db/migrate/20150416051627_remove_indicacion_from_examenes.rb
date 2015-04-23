class RemoveIndicacionFromExamenes < ActiveRecord::Migration
  def change
    remove_column :examenes, :indicacion_id, :integer
  end
end
