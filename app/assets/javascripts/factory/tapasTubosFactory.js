(function() {
	var labs = angular.module('lab');

	labs.factory('TapasTubos', function($resource) {
		return {
			all : $resource("/api/tapas_tubo/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
