(function() {
	var labs = angular.module('lab');
	labs.directive('navBar', function() {
		return {
			restrict : 'E',
			templateUrl : 'widgets/navBar.html',
			controller : 'NavBarController'
		};
	});
})();
