class AddDemoraProcesoToExamenes < ActiveRecord::Migration
  def change
  	add_column :examenes, :demora_proceso, :string
  end
end
