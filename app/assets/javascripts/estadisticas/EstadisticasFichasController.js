(function() {
	angular.module('lab').controller('EstadisticasFichasController', function($scope, $auth, $state, $http, $stateParams) {
		$scope.labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
		$scope.series_show = [];
		$scope.series = [];
		$scope.series_check = [];
		$scope.data = [];
		$scope.data_show = [];
		$http.get('/api/fichas/cantidades').success(function(result) {
			var cantidades = result.data;
			var series_cantidades = [];
			$scope.data = [];
			for(var i in cantidades){
				var data_cantidades = new Array();
				series_cantidades.push(i+'');
				var aux = new Object();
				aux.anno = i;
				aux.check = true;
				for(var j = 1; j <= 12; j++)
					if(cantidades[i][j])
						data_cantidades.push(cantidades[i][j]);
					else
						data_cantidades.push(0);
				$scope.data.push(data_cantidades);
				$scope.data_show.push(data_cantidades);
				//console.log($scope.data[0]);
				$scope.series_check.push(aux);
			}
			$scope.series = series_cantidades;
			$scope.series_show = series_cantidades;
			//$scope.data = data_cantidades;
			console.log($scope.data);
			$scope.isLoading = false;
		}).error(function(result) {
			$state.go('loginRequired.index');
		});
		
		$scope.check_serie = function(indice, dato){
			console.log(indice);
			$scope.isLoading = true;
			$scope.series_show = [];
			$scope.data_show = [];
			
			for(var i = 0; i < $scope.series.length; i++)
				if(i != indice){
					$scope.series_show.push($scope.series[i]);
					$scope.data_show.push($scope.data[i]);
				}
				else if(dato.check){
					$scope.series_show.push($scope.series[i]);
					$scope.data_show.push($scope.data[i]);
				}
			console.log($scope.data_show);
			$scope.isLoading = false;
		};
	});
})();
