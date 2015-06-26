class CreateTableValoresParametros < ActiveRecord::Migration
  def change
    create_table :valores_parametros do |t|
		t.integer	:parametro_id
		t.string	:codigo
		t.string	:nombre
		t.datetime	:creacion, :null => false, :default => Time.now
    end
	add_foreign_key :valores_parametros, :parametros, column: :parametro_id
  end
end
