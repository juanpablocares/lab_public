module Overrides
	class SessionsController < DeviseTokenAuth::SessionsController
		def destroy
			sign_out :user
			# remove auth instance variables so that after_filter does not run
			user = remove_instance_variable(:@resource) if @resource
			client_id = remove_instance_variable(:@client_id) if @client_id
			remove_instance_variable(:@token) if @token

			if user and client_id and user.tokens[client_id]
				user.tokens.delete(client_id)
				user.save!

				render json: {
		          success:true,
		          message: 'usando override controller',
		          user: current_user,
		        }, status: 200

			else
				render json: {
          errors: ["User was not found or was not logged in."]
        }, status: 404
			end
		end
	end
end