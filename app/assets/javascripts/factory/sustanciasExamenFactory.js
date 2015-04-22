(function() {
	var labs = angular.module('lab');

	labs.factory('SustanciasExamen', function($resource) {
		return {
			by_examen : $resource("/api/sustancias_examen/examen/:id", {
				id : "@id"
			}, {
				get : {
					method : 'GET',
				},
			}),
		};
	});

})();
