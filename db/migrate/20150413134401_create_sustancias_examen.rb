class CreateSustanciasExamen < ActiveRecord::Migration
  def change
    create_table :sustancias_examen do |t|
      t.references :sustancia, index: true
      t.references :examen, index: true

      t.timestamps null: false
    end
    add_foreign_key :sustancias_examen, :sustancias
    add_foreign_key :sustancias_examen, :examenes
  end
end
