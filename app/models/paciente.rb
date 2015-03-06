class Paciente < ActiveRecord::Base
	attr_accessor :region_id 
	belongs_to :comuna
	belongs_to :prevision
	belongs_to :user
end
