(function() {
	var labs = angular.module('lab');

	labs.factory('TarifasExamen', function($resource) {
		return {
			examen : $resource("/api/tarifas_examen/examen/:examen_id", {
				examen_id: '@examen_id',
			}, {
				get : {
					method : 'GET',
				},
			})
		};
	});
	
})();
