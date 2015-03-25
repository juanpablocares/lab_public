class Paciente < ActiveRecord::Base

	attr_accessor :region_id, :prevision_nombre, :comuna_nombre, :region_nombre

	has_one :paciente
	has_many :fichas
	belongs_to :comuna
	belongs_to :prevision
	belongs_to :user
end
