(function() {
	var labs = angular.module('lab');

	labs.factory('Examenes', function($resource) {
		return {
			buscar : $resource("/api/examenes", {
			}, {
				todos : {
					method : 'GET',
					isArray: false,
				},
			})
		};
	});
	
})();
