angular.module('lab').controller('TarifasExamenesController', function($scope, $auth, $state, $http, $stateParams, TarifasExamen) {
	$scope.estadoCSV = false;
	$scope.fileReader = [];
	$scope.examenes = [];
	$scope.header = [];
	$scope.isLoading = true;
	$scope.getHeader = function () {return $scope.header};
	
	$scope.header.push("examen_id");
	$scope.header.push("codigo_fonasa");
	$scope.header.push("codigo");
	$scope.header.push("nombre");
	
	$scope.processCSV = function(){
		if(!$scope.estadoCSV){
			window.alert("No ha seleccionado un archivo aún");
			return;
		}
		
		var examenes_update = [];
		var tarifas_update = [];
		
		for(i = 1; i < $scope.fileReader.length; i++){
			tarifas = ($scope.fileReader[i].length - 4) / 2;
			//console.log(tarifas);
			var tmp = new Object;
			tmp.id = $scope.fileReader[i][0];
			tmp.codigo_fonasa = $scope.fileReader[i][1];
			tmp.codigo = $scope.fileReader[i][2];
			tmp.nombre = $scope.fileReader[i][3];
			count = 1;
			for(j = 0; j < tarifas * 2; j+=2){
				var tarifa = new Object;
				tarifa.tarifa_id = count;
				tarifa.examen_id = $scope.fileReader[i][0];
				tarifa.precio = $scope.fileReader[i][4 + j];
				tarifa.precio_fonasa = $scope.fileReader[i][4 + j + 1];
				tarifas_update.push(tarifa);
				count++;
			}
			examenes_update.push(tmp);
		}
		
		TarifasExamen.examenes.update({
				tarifas_examen : tarifas_update,
			}).
			$promise.then(function(result) {
				console.log('update tarifas');
				console.log(result);
			});
		
		//console.log(examenes_update);
		console.log(tarifas_update);
	}
	
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

angular.module('lab').directive('fileReader', function() {
  return {
    link: function(scope, element) {
		//console.log(element);
      element.on('change', function(changeEvent) {
        var files = changeEvent.target.files;
        if (files.length) {
          var r = new FileReader();
          r.onload = function(e) {
              var contents = e.target.result;
			  var examenes = Papa.parse(contents);
			  //console.log(examenes.data);
			  scope.$apply(function () {
				//console.log('hizo el scope');
				//console.log(examenes.data);
                scope.fileReader = examenes.data;
				scope.estadoCSV = true;
				//console.log(scope.fileReader);
              });
          };
          
          r.readAsText(files[0]);
        }
      });
    }
  };
});
