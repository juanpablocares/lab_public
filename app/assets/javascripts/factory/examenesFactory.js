(function() {
	var labs = angular.module('lab');

	labs.factory('Examenes', function($resource) {
		return {
			all : $resource("/api/examenes", {
			}, {
				'index' : {
					method : 'GET',
					isArray : true
				},
				'update' : {
					method : 'PUT'
				}
			}),
			range : $resource("/api/examenes/range/:start/:number", {
				start : "@start",
				number : "@number",
			},
			{
				advanced : {
					method : 'POST',
					isArray: false,
				}
			}),
			buscar : $resource("/api/examenes", {
			}, {
				todos : {
					method : 'GET',
					isArray: false,
				},
			})
		};
	});
})();