class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
  
  belongs_to :permiso
  belongs_to :comuna
  
  has_many :modificacion_examenes
  has_many :fichas
  has_many :detalles_pago_ficha
  has_one  :detalle_ficha
  has_one  :resultado_examen_graba,  foreign_key: "user_id", class_name: "ResultadoExamen"
  has_one  :resultado_examen_valida, foreign_key: "usuario_valida_id", class_name: "ResultadoExamen"
end
