(function() {
	var labs = angular.module('lab');

	labs.factory('Previsiones', function($resource) {
		return {
			range : $resource("/api/previsiones/range/:start/:number", {
				start : "@start",
				number : "@number",
			},
			{
				advanced : {
					method : 'POST',
					isArray: false,
				}
			}),
			all : $resource("/api/previsiones/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
})();