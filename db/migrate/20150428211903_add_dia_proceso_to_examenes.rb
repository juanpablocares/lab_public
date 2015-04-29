class AddDiaProcesoToExamenes < ActiveRecord::Migration
  def change
  	add_column :examenes, :dia_proceso, :string
  end
end
