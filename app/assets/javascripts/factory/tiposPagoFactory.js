(function() {
	var labs = angular.module('lab');

	labs.factory('TiposPago', function($resource) {
		return {
			root : $resource("/api/tipos_pago/", {
			}, {
				get:{
					method : 'GET',
				},
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
