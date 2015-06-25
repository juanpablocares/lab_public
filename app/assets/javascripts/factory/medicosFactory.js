(function() {
	var labs = angular.module('lab');

	labs.factory('Medicos', function($resource) {
		return {
			buscar : $resource("/api/medicos", {
			}, {
				todos : {
					method : 'GET',
					isArray: false,
				},
			}),
			range : $resource("/api/medicos/range/:start/:number", {
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
