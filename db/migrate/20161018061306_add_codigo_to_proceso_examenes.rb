class AddCodigoToProcesoExamenes < ActiveRecord::Migration
  def change
    add_column :proceso_examenes, :codigo, :string
  end
end
