class LabMailer < ApplicationMailer
  def new_user(user)
    @user = user
    mail(to: @user.email, subject: 'Nueva cuenta para laboratorio')
  end
end
