# Preview all emails at http://localhost:3000/rails/mailers/lab_mailer_preview/new_user_preview
class LabMailerPreview < ActionMailer::Preview
	def new_user_preview
		user = User.first
		user.password = "A2je12Bw"
    	LabMailer.new_user(user)
  	end
end
