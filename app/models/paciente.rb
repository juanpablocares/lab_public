class Paciente < ActiveRecord::Base
	attr_accessor :region_id 
	has_many :fichas
	belongs_to :comuna
	belongs_to :prevision
	belongs_to :user
end
