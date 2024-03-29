module Overrides
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    before_filter :set_user_by_token, :only => [:destroy, :update]
    before_filter :validate_sign_up_params, :only => :create
    before_filter :validate_account_update_params, :only => :update
    skip_after_filter :update_auth_header, :only => [:create, :destroy]

    def create

      @resource            = resource_class.new(sign_up_params)
      @resource.provider   = "email"

      # honor devise configuration for case_insensitive_keys
      password = Devise.friendly_token[0..7]
      @resource.password = password

      if resource_class.case_insensitive_keys.include?(:email)
        @resource.email = sign_up_params[:email].try :downcase
      else
        @resource.email = sign_up_params[:email]
      end

      begin
        # override email confirmation, must be sent manually from ctrl
        resource_class.skip_callback("create", :after, :send_on_create_confirmation_instructions)
        if @resource.save
          yield @resource if block_given?

          unless @resource.confirmed?
            # user will require email authentication
            @resource.send_confirmation_instructions({
                   client_config: params[:config_name],
                   redirect_url: redirect_url
            })

          else
            # email auth has been bypassed, authenticate user
            @client_id = SecureRandom.urlsafe_base64(nil, false)
            @token     = SecureRandom.urlsafe_base64(nil, false)

            @resource.tokens[@client_id] = {
              token: BCrypt::Password.create(@token),
              expiry: (Time.now + DeviseTokenAuth.token_lifespan).to_i
            }

            @resource.save!

            update_auth_header

            LabMailer.new_user(@user).deliver_later

          end

          render json: {
            status: 'success',
            data:   @resource.as_json,
            password: @resource.password
          }
        else
          clean_up_passwords @resource
          render json: {
            status: 'error',
            data:   @resource.as_json,
            errors: @resource.errors.to_hash.merge(full_messages: @resource.errors.full_messages)
          }, status: 403
        end
      rescue ActiveRecord::RecordNotUnique
        clean_up_passwords @resource
        render json: {
          status: 'error',
          data:   @resource.as_json,
          errors: [I18n.t("devise_token_auth.registrations.email_already_exists", email: @resource.email)]
        }, status: 403
      end
    end

    def update
      if @resource
        if @resource.send(resource_update_method, account_update_params)
          yield @resource if block_given?
          render json: {
            status: 'success',
            data:   @resource.as_json
          }
        else
          render json: {
            status: 'error',
            errors: @resource.errors.to_hash.merge(full_messages: @resource.errors.full_messages)
          }, status: 403
        end
      else
        render json: {
          status: 'error',
          errors: [I18n.t("devise_token_auth.registrations.user_not_found")]
        }, status: 404
      end
    end

    def sign_up_params
      params.permit(devise_parameter_sanitizer.for(:sign_up))
    end

    def account_update_params
      params.permit(devise_parameter_sanitizer.for(:account_update))
    end

    private

    def resource_update_method
      if DeviseTokenAuth.check_current_password_before_update == :attributes
        "update_with_password"
      elsif DeviseTokenAuth.check_current_password_before_update == :password and account_update_params.has_key?(:password)
        "update_with_password"
      elsif account_update_params.has_key?(:current_password)
        "update_with_password"
      else
        "update_attributes"
      end
    end

    def validate_sign_up_params
      validate_post_data sign_up_params, I18n.t("errors.validate_sign_up_params")
    end

    def validate_account_update_params
      validate_post_data account_update_params, I18n.t("errors.validate_account_update_params")
    end

    def validate_post_data which, message
      render json: {
        status: 'error',
        errors: [message]
      }, status: :unprocessable_entity if which.empty?
    end
  end
end
