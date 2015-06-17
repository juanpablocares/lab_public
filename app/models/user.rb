class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
  
  has_many :modificacion_examenes
  has_many :fichas
  has_many :detalles_pago_ficha
  has_one  :detalle_ficha
end
