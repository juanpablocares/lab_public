class PermisoRol < ActiveRecord::Base
  belongs_to :rol
  belongs_to :permiso
end
