class CreateTableTiposEnvase < ActiveRecord::Migration
  def change
    create_table :tipos_envase do |t|
	  t.string "codigo"
      t.string "descripcion"
    end
	add_column :examenes, :tipo_envase_id, :integer
	add_foreign_key :examenes, :tipos_envase, column: :tipo_envase_id
  end
end
