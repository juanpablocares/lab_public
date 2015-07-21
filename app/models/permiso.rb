class Permiso < ActiveRecord::Base
	has_many  :users
end
