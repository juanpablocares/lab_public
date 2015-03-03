class ApplicationController < ActionController::Base

	before_filter :configure_permitted_parameters, if: :devise_controller?

	include DeviseTokenAuth::Concerns::SetUserByToken
	# Prevent CSRF attacks by raising an exception.
	# For APIs, you may want to use :null_session instead.
	# protect_from_forgery with: :null_session
	def angular
	end

	protected

	def configure_permitted_parameters
		#devise_parameter_sanitizer.for(:sign_up) do
		#|u| u.permit(:email, :password, :password_confirmation, :nombre, :apellido_paterno, :apellido_materno, :rut, :rutdv, :direccion, :telefono)
		#end
		devise_parameter_sanitizer.for(:sign_up) << :nombre
		devise_parameter_sanitizer.for(:sign_up) << :apellido_paterno
		devise_parameter_sanitizer.for(:sign_up) << :apellido_materno
		devise_parameter_sanitizer.for(:sign_up) << :rut
		devise_parameter_sanitizer.for(:sign_up) << :rutdv
		devise_parameter_sanitizer.for(:sign_up) << :direccion
		devise_parameter_sanitizer.for(:sign_up) << :telefono
		
		devise_parameter_sanitizer.for(:account_update) << :nombre
		devise_parameter_sanitizer.for(:account_update) << :apellido_paterno
		devise_parameter_sanitizer.for(:account_update) << :apellido_materno
		devise_parameter_sanitizer.for(:account_update) << :direccion
		devise_parameter_sanitizer.for(:account_update) << :telefono
		
	end
end
