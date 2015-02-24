class Sucursal < ActiveRecord::Base
  belongs_to :comuna
  belongs_to :laboratorio
end
