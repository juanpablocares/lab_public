(function() {
	var labs = angular.module('lab');

	labs.factory('TarifasExamen', function($resource) {
		return {
			examenes : $resource("/api/tarifas_examen/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
			range : $resource("/api/tarifas_examen/range/:tarifa_id/:start/:number", {
				tarifa_id : "@tarifa_id",
				start : "@start",
				number : "@number",
			},
			{
				advanced : {
					method : 'POST',
					isArray: false,
				}
			}),
		};
	});
	
})();
