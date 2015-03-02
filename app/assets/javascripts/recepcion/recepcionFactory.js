(function() {
	var labs = angular.module('lab');

	labs.factory('Pacientes', ['$resource',
	function($resource) {
		return $resource("/api/users/rut/:rut", { rut: "@rut" },
		{
		  'show':    { method: 'GET', isArray: false },
		  'update':  { method: 'PUT' },
		  'destroy': { method: 'DELETE' }
		});
	}]);

})();