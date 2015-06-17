(function() {
	var labs = angular.module('lab');

	labs.factory('ModificacionExamenes', function($resource) {
		return {
			root : $resource("/api/modificacion_examenes/crear/:examen_id/:user_id)", {
				user_id : "@user_id",
				examen_id : "@examen_id"
			}, {
				nuevo : {
					method : 'POST',
					isArray : false,
				},
			}),
			examenes : $resource("/api/modificacion_examenes/examen/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
