(function() {
	var labs = angular.module('lab');

	labs.factory('Fichas', function($resource) {
		return {
			root : $resource("/api/fichas", {
			}, {
				new : {
					method : 'POST',
					isArray: false,
				},
			}),
			by_paciente : $resource("/api/fichas/paciente/:id", {
				id : "@id",
			}, {
				paciente_id : {
					method : 'GET',
					isArray : false
				},
			}),
			search : $resource("/api/fichas/range/:start/:number", {
				start : "@start",
				number : "@number",
			},
			{
				advanced : {
					method : 'POST',
					isArray: false,
					// no es necesario agregar params, se agregan dentro de la funcion cuando se llame. Ficha.buscar(params);
				}
			})
		};
	});
})();
