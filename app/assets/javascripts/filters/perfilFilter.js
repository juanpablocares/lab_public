angular.module('lab').filter('perfilFilter', [function($filter) {
	return function(inputArray){
		var data = [];
		angular.forEach(inputArray, function(item){
			if(item.perfil)data.push(item);
		});      
		return data;
}}]);