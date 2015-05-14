class DetallePagosFicha < ActiveRecord::Base
  belongs_to :ficha
  belongs_to :tipo_pago
  belongs_to :user
  belongs_to :prevision
  
  self.table_name = "detalles_pagos_ficha"
end
