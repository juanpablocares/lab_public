class CreateDetalleFichas < ActiveRecord::Migration
  def change
    create_table :detalle_fichas do |t|
      t.references :ficha, index: true
      t.references :examen, index: true
      t.references :perfil_examen, index: true
      t.references :usuario_muestra, index: true
      t.datetime :fecha_muestra
      t.ref :tipo_muestra

      t.timestamps null: false
    end
    add_foreign_key :detalle_fichas, :fichas
    add_foreign_key :detalle_fichas, :examenes
    add_foreign_key :detalle_fichas, :perfil_examenes
    add_foreign_key :detalle_fichas, :usuario_muestras
  end
end
