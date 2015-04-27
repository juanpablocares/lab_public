(function() {
	var labs = angular.module('lab');

	labs.factory('TarifasExamen', function($resource) {
		return {
			examenes : $resource("/api/tarifas_examen/", {
			}, {
				update : {
					method : 'PUT',
				},
			})
		};
	});
	
})();
