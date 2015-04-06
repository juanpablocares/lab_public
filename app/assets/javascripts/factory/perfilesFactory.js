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
			}),
			id : $resource("/api/perfiles/:id", {
				id: '@id',
			}, {
				get : {
					method : 'GET',
					isArray: false,
				},
			})
		};
	});
	
})();
