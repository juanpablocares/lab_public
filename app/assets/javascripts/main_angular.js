(function()
{
	var labs = angular.module('lab', ['ui.bootstrap', 'ui.router', 'templates', 'ng-token-auth']).config(function($authProvider)
	{
		$authProvider.configure(
		{
			apiUrl : ''
		});
	}).config(function($stateProvider, $urlRouterProvider)
	{
		$urlRouterProvider.otherwise('/home');

		$stateProvider.state('login',
		{
			url : '/login',
			templateUrl : "login/login.html",
			controller : 'LoginController'
		}).state('index',
		{
			url : '/home',
			template : "hola, esto es el main",
		});
	}).directive('navBar', function(){
		return {
			restrict : 'E',
			templateUrl : 'widgets/navBar.html',
			controller : 'NavBarController'
		};
	});
})();
