(function() {
	var labs = angular.module('lab');

	labs.factory('Perfiles', function($resource) {
		return {
			buscar : $resource("/api/perfiles", {
			}, {
				todos : {
					method : 'GET',
					isArray: false,
				},
			})
		};
	});
	
})();
