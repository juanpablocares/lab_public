class SustanciaExamen < ActiveRecord::Base
  belongs_to :sustancia
  belongs_to :examen
end
