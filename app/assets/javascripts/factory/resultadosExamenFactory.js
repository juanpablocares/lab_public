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
		};
	});

})();
