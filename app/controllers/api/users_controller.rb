class Api::UsersController < ActionController::Base
	
	before_action :authenticate_user!
	
	def accountAttributes
		render json: current_user
	end
end
