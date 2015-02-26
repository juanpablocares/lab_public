angular.module('lab').factory("Secure", function($resource) {
	return $resource("/api/users/:rut", { rut: "@rut" },
    {
      'show':    { method: 'GET', isArray: false },
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' }
    });
});