class Precio < ActiveRecord::Base
  belongs_to :tramo
  belongs_to :examen
end
