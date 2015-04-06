(function() {
	var labs = angular.module('lab');

	labs.factory('Tarifas', function($resource) {
		return {
			all : $resource("/api/tarifas", {
			}, {
				'index' : {
					method : 'GET',
					isArray : true
				}
			}),
			range : $resource("/api/tarifas/range/:start/:number", {
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