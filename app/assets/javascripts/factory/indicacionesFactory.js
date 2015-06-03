(function() {
	var labs = angular.module('lab');

	labs.factory('Indicaciones', function($resource) {
		return {
			all : $resource("/api/indicaciones/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
