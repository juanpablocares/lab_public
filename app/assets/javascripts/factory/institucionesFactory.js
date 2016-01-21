(function() {
	var labs = angular.module('lab');

	labs.factory('Instituciones', function($resource) {
		return {
			all : $resource("/api/instituciones/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
