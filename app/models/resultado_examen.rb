class ResultadoExamen < ActiveRecord::Base
  belongs_to :examen_parametro
  belongs_to :detalle_ficha
  belongs_to :usuario_graba,  foreign_key: "user_id", class_name: "User"
  belongs_to :usuario_valida,  foreign_key: "usuario_valida_id", class_name: "User"
end
