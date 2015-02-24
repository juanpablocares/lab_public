class Ficha < ActiveRecord::Base
  belongs_to :paciente
  belongs_to :procedencia
  belongs_to :orden_medica
  belongs_to :usuario_creador
end
