class AddColumnsExamen < ActiveRecord::Migration
  def change
	add_column :examenes, :creador, :string
	add_column :examenes, :nombre_impreso, :string
	add_column :examenes, :sigla, :string
	add_column :examenes, :proceso, :string
	add_column :examenes, :area_trabajo, :string
	add_column :examenes, :volumen_minimo, :integer
	add_column :examenes, :condiciones_transporte, :string
	add_column :examenes, :maximo_toma_muestra, :string
	add_column :examenes, :unidad_medida, :string
	add_column :examenes, :metodo, :string
	add_column :examenes, :metodo_abreviado, :string
	add_column :examenes, :proceso_lunes, :boolean
	add_column :examenes, :proceso_martes, :boolean
	add_column :examenes, :proceso_miercoles, :boolean
	add_column :examenes, :proceso_jueves, :boolean
	add_column :examenes, :proceso_viernes, :boolean
	add_column :examenes, :proceso_sabado, :boolean
	add_column :examenes, :principio_metodo, :string
	add_column :examenes, :interferentes, :string
	add_column :examenes, :calculos, :string
	add_column :examenes, :proposito, :string
	add_column :examenes, :analista_responsable, :string
	add_column :examenes, :rechazo_hemolisis, :string
	add_column :examenes, :rechazo_proteccion_luz, :string
	add_column :examenes, :rechazo_lipemia, :string
	add_column :examenes, :rechazo_ictericia, :string
	add_column :examenes, :rechazo_tubo, :string
	add_column :examenes, :rechazo_otros, :string
	add_column :examenes, :observaciones, :string
  end
end
