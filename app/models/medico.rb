class Medico < ActiveRecord::Base
	has_many :fichas
	belongs_to :especialidad
	belongs_to :institucion
end
