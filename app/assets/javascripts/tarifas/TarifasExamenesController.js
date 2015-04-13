angular.module('lab').controller('TarifasExamenesController', function($scope, $auth, $state, $http, $stateParams, Examen) {
	
	var examenes = [];
	
	$scope.getHeader = function () {return ["examen_id", "codigo_fonasa", "codigo", "nombre", "tarifa_id", "precio", "precio_fonasa"]};
	
	//console.log($scope.getArray);
	
	$http.get('/api/examenes').success(function(data) {
			
			examenes = data.examenes;
			for(var i = 0; i < examenes.length; i++){
				Examen.get({
						id : examenes[i].id
					}, function(datos) {
						console.log(datos);
					});
			};
			
		}).error(function(data) {
			// log error
		});
	
	$http.get('/api/tarifas/examenes').success(function(data) {
			$scope.getArray = data;
			//console.log(data);
		}).error(function(data) {
			// log error
		});
});
