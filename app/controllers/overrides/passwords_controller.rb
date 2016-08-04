module Overrides
	class PasswordsController < DeviseTokenAuth::PasswordsController
		before_filter :set_user_by_token, :only => [:update]
		def update
			# make sure user is authorized
			unless @resource
				return render json: {
			          success: false,
			          errors: ['Unauthorized']
			        }, status: 401
			end
			
			# make sure account doesn't use oauth2 provider
			unless @resource.provider == 'email'
				return render json: {
			          success: false,
			          errors: ["This account does not require a password. Sign in using "+
			                   "your #{@resource.provider.humanize} account instead."]
			        }, status: 422
			end

			# ensure that password params were sent
			unless password_resource_params[:password] and password_resource_params[:password_confirmation] and password_resource_params[:current_password]
				return render json: {
			          success: false,
			          errors: ['You must fill out the fields labeled "password", "password confirmation" and "old password".']
			        }, status: 422
			end
			
			#verify old password
			user = User.find_by_email(@resource.email)
			unless user.valid_password?(params['current_password'])
				return render json: {
			          success: false,
			          errors: ['Password check failed'],
			        }, status: 401
			end 
			
			temp = password_resource_params
			temp.delete("current_password")
			password_resource_params = temp 

			if @resource.update_attributes(password_resource_params)
				return render json: {
			          success: true,
			          data: {
			            user: @resource,
			            message: "Your password has been successfully updated."
			          }
			        }
			else
				return render json: {
			          success: false,
			          errors: @resource.errors
			        }, status: 422
			end
		end

		def validar_password
			unless current_user.valid_password?(params[:password])
				return render json: {
			          success: false,
			          errors: ['Password check failed'],
			        }, status: 401
			else
				return render json: {
		          success: true,
		          data: {
		            message: "Your password has been validated."
		          }, status: 200
		        }
			end
		end

	end


	def resource_params
		params.permit(:email, :password, :password_confirmation, :reset_password_token, :current_password)
	end
end