class CreateTipoExamen < ActiveRecord::Migration
  def change
    create_table :tipo_examenes do |t|
	  t.string		"codigo", :limit => 5
      t.text		"nombre"
    end
	remove_column :indicaciones, :tipo
  end
end
