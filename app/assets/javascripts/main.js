(function() {
	var labs = angular.module('lab', ['platanus.rut', 'ui.mask', 'ui.bootstrap', 'ui.router', 'templates', 'ng-token-auth']);
	
	labs.run(function($rootScope, $urlRouter, $auth, $location) {
		$rootScope.$on('$locationChangeSuccess', function(evt) {
			evt.preventDefault();

		});
	});
})();
