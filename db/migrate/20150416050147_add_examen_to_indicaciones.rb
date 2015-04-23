class AddExamenToIndicaciones < ActiveRecord::Migration
  def change
    add_reference :indicaciones, :examen, index: true
    add_foreign_key :indicaciones, :examenes
  end
end
