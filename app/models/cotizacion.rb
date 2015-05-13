class Cotizacion < ActiveRecord::Base
  belongs_to :paciente
  belongs_to :procedencia
  belongs_to :user
end
