class RemoveProcedenciaFromExamenes < ActiveRecord::Migration
  def change
  	remove_column :examenes, :procedencia, :string
  end
end
