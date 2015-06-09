class Paciente < ActiveRecord::Base

	attr_accessor :region_id, :prevision_nombre, :comuna_nombre, :region_nombre

	has_one :paciente
	has_many :fichas
	belongs_to :comuna
	belongs_to :prevision
	belongs_to :user
	
	def calculate_age(birthday)
		(Date.today - birthday).to_i / 365
	end
end
