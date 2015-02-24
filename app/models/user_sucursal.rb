class UserSucursal < ActiveRecord::Base
  belongs_to :user
  belongs_to :sucursal
end
