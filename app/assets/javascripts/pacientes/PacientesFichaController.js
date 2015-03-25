angular.module('lab').controller('PacientesFichaController', function($scope, $auth, $state, $http, $stateParams, Examen) {

	$scope.$on('fichaFromMenu', function(event, data) {
		console.log('fichaFromMenu');
		console.log(data);
		$scope.ficha = data;		
		$scope.masterFicha = angular.copy($scope.ficha);
	});

	$scope.fichaEditing = false;
	
	if ($stateParams.ficha != null) {
		$scope.ficha = $stateParams.ficha;
		$scope.masterFicha = angular.copy($scope.ficha);
	}
	
	$scope.resetFicha = function() {
		$scope.fichaEditingForm.$setPristine();
		$scope.ficha = angular.copy($scope.masterFicha);
	};

	$scope.cambiarVentanaSinCambios = function() {
		$scope.fichaEditing = !$scope.fichaEditing;
		$scope.resetFicha();
	};

	$scope.updateExamen = function() { 
		$scope.masterExamen = angular.copy($scope.examen);
		$scope.$emit('examenFromEdit',$scope.examen);
	};

	$scope.guardarDatosExamen = function(examen) {
		examen.procedencia = examen.procesa.label;
		examen.indicacion_id = examen.indicacion.id;
		examen.tipo_examen_id = examen.tipo_examen.id;
		Examen.update({id:examen.id}, examen).
			$promise.
				then(function(response) {
					$scope.masterExamen = angular.copy($scope.examen);
					$scope.$emit('examenFromEdit',$scope.examen);
					$scope.examenEditing = !$scope.examenEditing;
				}, function(response) {
					$scope.resetExamen();
					console.log("ERROR editando examen");
				});
	};
});
