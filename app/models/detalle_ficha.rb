class DetalleFicha < ActiveRecord::Base
  belongs_to :ficha
  belongs_to :examen
  belongs_to :perfil_examen
  belongs_to :usuario_muestra
  belongs_to :tipo_muestra
  self.table_name = "detalles_ficha"
end
