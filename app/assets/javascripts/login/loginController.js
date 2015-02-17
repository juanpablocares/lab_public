angular.module('lab').controller('LoginController', function($auth)
{
	this.registerCredencial = {
		email: "mailfalso@falsedad.com",
		password: "passterrible",
		password_confirmation: "passterrible"
	}
	this.login =
	{
	};

	console.log(this.registerCredencial);
	$auth.submitRegistration(this.registerCredencial);

	this.submitLoginForm = function(loginCredentials)
	{
		console.log(loginCredentials);
		$auth.submitLogin(loginCredentials).then(function(resp)
		{
			// handle success response
			console.log(resp);
		}).catch(function(resp)
		{
			// handle error response
			console.log(resp);
		});
	};
}); 