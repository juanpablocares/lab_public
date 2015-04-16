angular.module('lab').controller('TarifasExamenesController', function($q, $scope, $auth, $state, $http, $stateParams, TarifasExamen) {
	
	$scope.examenes = [];
	$scope.header = [];
	$scope.isLoading = true;
	$scope.getHeader = function () {return $scope.header};
	
	$scope.header.push("examen_id");
	$scope.header.push("codigo_fonasa");
	$scope.header.push("codigo");
	$scope.header.push("nombre");
	
	var query = $http.get('/api/examenes/select').success(function(data) {
			datos = [];
			tarifas = 0;
			$scope.examenes = data.examenes;
			for(i = 0; i < $scope.examenes.length; i++){
				var tmp = Array();
				tmp.push($scope.examenes[i].id);
				tmp.push($scope.examenes[i].codigo_fonasa);
				tmp.push($scope.examenes[i].codigo);
				tmp.push($scope.examenes[i].nombre);
				//console.log(tmp);
				for(j = 0; j < $scope.examenes[i].tarifas_examen.length; j++){
					if(tarifas < $scope.examenes[i].tarifas_examen.length)
						tarifas = $scope.examenes[i].tarifas_examen.length;
					tmp.push($scope.examenes[i].tarifas_examen[j].precio);
					tmp.push($scope.examenes[i].tarifas_examen[j].precio_fonasa);
					//console.log($scope.examenes[i].tarifas_examen);
				};
				//console.log(tmp);
				datos.push(tmp);
			};
			
			for(i = 0; i < tarifas; i++){
				$scope.header.push("precio_tarifa_" + (i+1));
				$scope.header.push("precio_fonasa_taria_" + (i+1));
			}
			
			$scope.getArray = datos;
			$scope.isLoading = false;
		}).error(function(data) {
			// log error
		});
});
