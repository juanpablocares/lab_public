class Api::UsersController < ActionController::Base
	
	before_filter :authenticate_user!
end
