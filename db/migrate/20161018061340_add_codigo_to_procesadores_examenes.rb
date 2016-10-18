class AddCodigoToProcesadoresExamenes < ActiveRecord::Migration
  def change
    add_column :procesadores_examenes, :codigo, :string
  end
end
