class RemoveDiagnosticoFromPacientes < ActiveRecord::Migration
  def change
  	remove_column :pacientes, :diagnostico, :text
  end
end