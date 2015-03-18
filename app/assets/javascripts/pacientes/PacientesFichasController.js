angular.module('lab').controller('PacientesFichasController', ['$scope', '$stateParams', 'Fichas', '$http', function($scope, $stateParams, Fichas, $http) {

	$scope.isData = false;
	
	Fichas.by_paciente.paciente_id({
			id : $stateParams.paciente_id
		}, function(datos) {
		
			$scope.rowCollection = datos.fichas;
			if(datos.fichas.length == 0){
				$scope.isData = false;
			}
			else{
				$scope.isData = true;
				}
		});
	
	console.log($scope.isData);
}]);
