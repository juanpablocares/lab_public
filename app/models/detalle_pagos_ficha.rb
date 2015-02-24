class DetallePagosFicha < ActiveRecord::Base
  belongs_to :ficha
  belongs_to :tipo_pago
  belongs_to :prevision
end
