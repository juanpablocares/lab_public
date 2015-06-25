(function() {
	angular.module('lab').controller('MuestrasSearchController', function($scope, $auth, $state, $http, $stateParams, Fichas) {
		$scope.fecha = new Date();
		$scope.getEdad = function(data) {
			if(data != null)
			{
				data = new Date(data.getUTCFullYear(), data.getUTCMonth(),data.getUTCDate());
				
				var d = new Date();
				var meses = 0;
				if(data.getUTCMonth() - d.getMonth() > 0)
					meses += 12 - data.getUTCMonth() + d.getMonth();
				else
					meses = Math.abs(data.getUTCMonth() - d.getMonth());
				var nac = new Date(data);
				var birthday = +new Date(data);
				var anios = ((Date.now() - birthday) / (31556926000));
				return ~~anios;
			}
		};
	
		$scope.displayed = [];
		$scope.callServer = function callServer(tableState) {
			$scope.displayed = [];
			$scope.isLoading = true;

			var pagination = tableState.pagination;

			var start = pagination.start || 0;
			// This is NOT the page number, but the index of item in the list that you want to use to display the table.
			var number = pagination.number || 10;
			// Number of entries showed per page.
			
			Fichas.muestras.advanced({
				//fecha : $scope.fecha,
				start : start,
				number : number
			}, tableState).
			$promise.then(function(result) {
				$scope.displayed = result.data;
				console.log(result.data);
				tableState.pagination.numberOfPages = result.numberOfPages;
				
				for(var i in $scope.displayed){
					$scope.displayed[i].paciente.fecha_nacimiento = new Date($scope.displayed[i].paciente.fecha_nacimiento);
					$scope.displayed[i].edad = $scope.getEdad($scope.displayed[i].paciente.fecha_nacimiento);
					$scope.displayed[i].estado = "Pendiente";
					//Checkear estado
					if($scope.displayed[i].detalles_ficha){
						var sum = 0;
						var count = 0;
						var j;
						for(j in $scope.displayed[i].detalles_ficha){
							count++;
							if($scope.displayed[i].detalles_ficha[j].usuario_muestra_id != null){
								sum++;
								$scope.displayed[i].flebotomista = $scope.displayed[i].detalles_ficha[j].usuario_muestra.nombre + ' ' + $scope.displayed[i].detalles_ficha[j].usuario_muestra.apellido_paterno;
							}
						}
						if(sum == count){
							$scope.displayed[i].estado = "Atendido";
						}
						else if(sum > 0){
							$scope.displayed[i].estado = "En proceso";
						}
					}
				}
				
				//set the number of pages so the pagination can update
				$scope.isLoading = false;
			});
		};
		
	});
})();
