(function() {
	var labs = angular.module('lab');

	labs.factory('Procedencias', function($resource) {
		return {
			buscar : $resource("/api/procedencias", {
			}, {
				todos : {
					method : 'GET',
					isArray: false,
				},
			})
		};
	});
	
})();
