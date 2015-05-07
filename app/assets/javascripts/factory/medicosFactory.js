(function() {
	var labs = angular.module('lab');

	labs.factory('Medicos', function($resource) {
		return {
			buscar : $resource("/api/medicos", {
			}, {
				todos : {
					method : 'GET',
					isArray: false,
				},
			})
		};
	});
	
})();
