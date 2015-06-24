class Medico < ActiveRecord::Base
	has_many :fichas
	belongs_to :especialidad
end
