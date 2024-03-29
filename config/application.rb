require File.expand_path('../boot', __FILE__)
require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module TestApp
	class Application < Rails::Application
		
		require 'core_ext/string'
	
		# Settings in config/environments/* take precedence over those specified here.
		# Application configuration should go into files in config/initializers
		# -- all .rb files in that directory are automatically loaded.

		# Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
		# Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
		# config.time_zone = 'Central Time (US & Canada)'
		config.time_zone = "America/Santiago"
		#config.active_record.default_timezone = "Santiago"
		# The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
		# config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
		# config.i18n.default_locale = :de

		config.assets.paths << Rails.root.join("vendor","assets","bower_components")
		config.assets.paths << Rails.root.join("vendor","assets","bower_components","font-awesome","fonts")
	    config.assets.paths << Rails.root.join("vendor","assets","bower_components","bootstrap-sass-official","assets","fonts")

		config.assets.precompile << %r(.*.(?:eot|svg|ttf|woff)$)

		# Do not swallow errors in after_commit/after_rollback callbacks.
		config.active_record.raise_in_transactional_callbacks = true

		config.middleware.use Rack::Cors do
			allow do
				origins 'http://www.aideas.cl'
				resource '*',
          :headers => :any,
          :expose  => ['access-token', 'expiry', 'token-type', 'uid', 'client'],
          :methods => [:get, :post, :options, :delete, :put]
			end
		end
	end
end
