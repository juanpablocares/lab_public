(function() {
	var labs = angular.module('lab');

	labs.factory('Fichas', function($resource) {
		return {
			search : $resource("/api/comunas/buscartest/:start/:number", {
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
