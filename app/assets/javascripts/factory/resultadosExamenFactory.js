(function() {
	var labs = angular.module('lab');

	labs.factory('ResultadosExamen', function($resource) {
		return {
			by_detalle_ficha : $resource("/api/resultados_examen/detalle_ficha/:id", {
				id : "@id"
			}, {
				get : {
					method : 'GET',
				},
				save: 
				{
					method: 'POST',
				}
			}),
			exaparam_detficha : $resource("/api/resultados_examen/detalle_ficha/:detalle_ficha_id/examen_parametro/:examen_parametro_id", {
				detalle_ficha_id : '@detalle_ficha_id',
				examen_parametro_id: '@examen_parametro_id'
			}, {
				get : {
					method : 'GET',
				},
				update : {
					method : 'PUT',
				},
			}),
		};
	});

})();
