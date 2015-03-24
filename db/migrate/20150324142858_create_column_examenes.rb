class CreateColumnExamenes < ActiveRecord::Migration
  def change
    add_column :examenes, :tipo_examen_id, :integer
  end
end