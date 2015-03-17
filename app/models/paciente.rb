class Paciente < ActiveRecord::Base

	attr_accessor :region_id, :prevision_nombre, :comuna_nombre

	has_many :fichas
	belongs_to :comuna
	belongs_to :prevision
	belongs_to :user
end
