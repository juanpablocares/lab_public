angular.module('lab').controller('RecepcionController', [
	'$scope', '$http', 'Pacientes',
		function($scope, $http, Pacientes)
		{
			$scope.tipo = 0;
			$scope.valido = false;
			$scope.rut = 0;
			$scope.edad = 'Ingrese fecha';
			$scope.nombres = '';
			$scope.paterno = '';
			$scope.materno = '';
			$scope.celular = 0;
			$scope.direccion = '';
			$scope.region = '';
			$scope.fechaNacimiento = new Date();
			$scope.genero = '';
			$scope.prevision = '';
			$scope.diagnostico = '';
			
			var tmp = Pacientes.show({rut: 12312312});
			console.log(tmp);
			
			$scope.clean = function(){
				$scope.valido = false;
				$scope.rut = 0;
				$scope.edad = 'Ingrese fecha';
				$scope.nombres = '';
				$scope.paterno = '';
				$scope.materno = '';
				$scope.celular = 0;
				$scope.direccion = '';
				$scope.region = '';
				$scope.fechaNacimiento = new Date();
				$scope.genero = '';
				$scope.prevision = '';
				$scope.diagnostico = '';
			}
		
			$scope.saveRut = function(value, valido){
				if(valido){				
					console.log("Entro");
					$scope.rut = value;
					$scope.valido = true;
					$scope.tipo = 1;
					$scope.myrut = null;
					//console.log(Paciente.show(12312312));
				}
			}
		
			$scope.storeData = function(){
				console.log($scope.rut);
				console.log($scope.edad);
				console.log($scope.nombres);
				console.log($scope.paterno);
				console.log($scope.materno);
				console.log($scope.celular);
				console.log($scope.direccion);
				console.log($scope.region);
				console.log($scope.fechaNacimiento);
				console.log($scope.genero);
				console.log($scope.prevision);
				console.log($scope.diagnostico);
				//if confirm("Agregar los datos?"){
					//$scope.posts.push Post.save title: $scope.post.title, body: $scope.post.body
				//}
			}
		
			$scope.calculateAge = function calculateAge(birthday) { // birthday is a date
				var dateBirthday = new Date(birthday);
				var ageDifMs = Date.now() - dateBirthday.getTime();
				var ageDate = new Date(ageDifMs); // miliseconds from epoch
				$scope.edad = Math.abs(ageDate.getUTCFullYear() - 1970);
				return Math.abs(ageDate.getUTCFullYear() - 1970);
			}
			
			$http.get('/api/previsiones').
				success(function(data) {
					$scope.plans = data;
				}).
				error(function(data) {
					// log error
				});
			
			$http.get('/api/regiones').
				success(function(data) {
					$scope.regions = data;
				}).
				error(function(data) {
					// log error
				});
			
			$http.get('/api/comunas').
				success(function(data) {
					$scope.comuns = data;
				}).
				error(function(data) {
					// log error
				});
			
			$http.get('/api/users').
				success(function(data) {
					$scope.ruts = data;
				}).
				error(function(data) {
					// log error
				});
				
			$scope.submit = function(form) {
			  // Trigger validation flag.
			  $scope.submitted = true;

			  // If form is invalid, return and let AngularJS show validation errors.
			  if (form.$invalid) {
				return;
			  }

			  // Default values for the request.
			  var config = {
				params : {
				  'callback' : 'JSON_CALLBACK',
				  'name' : $scope.name,
				  'email' : $scope.email,
				  'subjectList' : $scope.subjectList,
				  'url' : $scope.url,
				  'comments' : $scope.comments
				},
			  };

			  // Perform JSONP request.
			  var $promise = $http.jsonp('response.json', config)
				.success(function(data, status, headers, config) {
				  if (data.status == 'OK') {
					$scope.name = null;
					$scope.email = null;
					$scope.subjectList = null;
					$scope.url = null;
					$scope.comments = null;
					$scope.messages = 'Your form has been sent!';
					$scope.submitted = false;
				  } else {
					$scope.messages = 'Oops, we received your request, but there was an error processing it.';
					$log.error(data);
				  }
				})
				.error(function(data, status, headers, config) {
				  $scope.progress = data;
				  $scope.messages = 'There was a network error. Try again later.';
				  $log.error(data);
				})
				.finally(function() {
				  // Hide status messages after three seconds.
				  $timeout(function() {
					$scope.messages = null;
				  }, 3000);
				});

			  // Track the request and show its progress to the user.
			  $scope.progress.addPromise($promise);
			};
		}
	]);