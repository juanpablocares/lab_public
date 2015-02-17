(function()
{
	var labs = angular.module('lab', ['ui.bootstrap', 'ng-token-auth']).config(function($authProvider)
	{
		$authProvider.configure(
		{
			apiUrl : ''
		});
	});
})(); 