class ExamenPerfil < ActiveRecord::Base
  belongs_to :examen
  belongs_to :perfil
end
