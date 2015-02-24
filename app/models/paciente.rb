class Paciente < ActiveRecord::Base
  belongs_to :comuna
  belongs_to :prevision
  belongs_to :user
end
