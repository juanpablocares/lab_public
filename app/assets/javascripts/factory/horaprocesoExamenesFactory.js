(function() {
	var labs = angular.module('lab');

	labs.factory('HoraprocesoExamenes', function($resource) {
		return {
			all : $resource("/api/horaproceso_examenes/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
