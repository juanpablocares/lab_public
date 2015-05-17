class FixColumnPerfilExamenesIdFromDetallesCotizacion < ActiveRecord::Migration
  def change
    rename_column :detalles_cotizacion, :perfil_examen_id, :perfil_id
  end
end
