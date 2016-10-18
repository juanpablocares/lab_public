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
	$scope.header.push("proceso");
	$scope.header.push("procesador");
	$scope.header.push("tipo_pago");
	$scope.header.push("autorizado_fonasa");
	
	$scope.processCSV = function(){
		
		if(!$scope.estadoCSV){
			window.alert("No ha seleccionado un archivo aún");
			return;
		}
		
		var examenes_update = [];
		var tarifas_update = [];
		console.log($scope.fileReader);
		for(var i in $scope.fileReader)
			if(i > 0){
				tarifas = ($scope.fileReader[i].length - 8) / 2;
				//console.log(tarifas);
				var tmp = new Object;
				tmp.id = $scope.fileReader[i][0];
				tmp.codigo_fonasa = $scope.fileReader[i][1];
				tmp.codigo = $scope.fileReader[i][2];
				tmp.nombre = $scope.fileReader[i][3];
				tmp.proceso_examen = $scope.fileReader[i][4];
				tmp.procesador_examen = $scope.fileReader[i][5];
				tmp.tipo_pago = $scope.fileReader[i][6];
				tmp.autorizado_fonasa = $scope.fileReader[i][7];
				count = 1;
				for(j = 0; j < tarifas * 2; j+=2)
					if(i > 0){
						var tarifa = new Object;
						tarifa.tarifa_id = count;
						tarifa.examen_id = $scope.fileReader[i][0];
						tarifa.precio = $scope.fileReader[i][8 + j];
						//console.log(tarifa.precio);
						tarifa.precio_fonasa = $scope.fileReader[i][8 + j + 1];
						//console.log(tarifa.precio_fonasa);
						tarifas_update.push(tarifa);
						count++;
					}
				if(tmp.nombre != undefined)
					examenes_update.push(tmp);
			}
		//console.log(examenes_update);
		//console.log(tarifas_update);
		$scope.isLoading = true;
		TarifasExamen.examenes.update({
				tarifas_examen : tarifas_update,
				examenes : examenes_update,
			}).
			$promise.then(function(result) {
				console.log('update tarifas');
				console.log(result);
				$scope.isLoading = false;
			});
	}
	
	$http.get('/api/examenes/select').success(function(data){
		$http.get('/api/tarifas').success(function(data_tarifas) {
			datos = [];
			tarifas = data_tarifas.length;
			$scope.examenes = data.examenes;
			for(i = 0; i < $scope.examenes.length; i++){
				var tmp = Array();
				tmp.push($scope.examenes[i].id);
				tmp.push($scope.examenes[i].codigo_fonasa);
				tmp.push($scope.examenes[i].codigo);
				tmp.push($scope.examenes[i].nombre);
				tmp.push($scope.examenes[i].proceso_examen?$scope.examenes[i].proceso_examen.codigo:'');
				tmp.push($scope.examenes[i].procesador_examen?$scope.examenes[i].procesador_examen.codigo:'');
				tmp.push($scope.examenes[i].tipo_pago);
				tmp.push($scope.examenes[i].autorizado_fonasa?'Si':'No');
				//console.log(tmp);
				for(var j = 0; j < tarifas; j++){
					/*if(tarifas < $scope.examenes[i].tarifas_examen.length)
						tarifas = $scope.examenes[i].tarifas_examen.length;
					tmp.push($scope.examenes[i].tarifas_examen[j].precio);
					tmp.push($scope.examenes[i].tarifas_examen[j].precio_fonasa);*/
					if($scope.examenes[i].tarifas_examen[j] != undefined){
						tmp.push($scope.examenes[i].tarifas_examen[j].precio);
						tmp.push($scope.examenes[i].tarifas_examen[j].precio_fonasa);
					}
					else{
						tmp.push('');
						tmp.push('');
					}
					//console.log($scope.examenes[i].tarifas_examen);
				};
				datos.push(tmp);
			};
			//console.log(datos);
			for(i = 0; i < tarifas; i++){
				$scope.header.push("precio_tarifa_" + (i+1));
				$scope.header.push("precio_fonasa_tarifa_" + (i+1));
			}
			
			$scope.getArray = datos;
			$scope.isLoading = false;
		}).error(function(data) {
			// log error
		});
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
