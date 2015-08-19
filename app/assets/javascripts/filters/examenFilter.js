angular.module('lab').filter('examenFilter', [function($filter) {
	return function(inputArray, texto){
		if(!angular.isDefined(texto) || texto == ''){
			return inputArray;
		}
		var data=[];
		texto = texto.trim().toLowerCase();
		texto = texto.split(' ');
		angular.forEach(inputArray, function(item){
			var codigo = '';
			if(angular.isDefined(item.codigo) || item.codigo != ''){
				codigo = codigo + item.codigo;
			}
			if(angular.isDefined(item.codigo_fonasa) || item.codigo_fonasa != ''){
				codigo = codigo + ' - '+item.codigo_fonasa;
			}
			codigo = codigo.toLowerCase();
			var coincide = true;

			angular.forEach(texto, function(valor)
			{
				if (coincide)
				{
					if((item.nombre != null && item.nombre != '' && item.nombre.toLowerCase().indexOf(valor) == 0 ) ||
					   (item.nombre_impreso != null && item.nombre_impreso != '' && item.nombre_impreso.toLowerCase().indexOf(valor) == 0) ||
					   (codigo.toLowerCase().indexOf(valor) == 0) ||
					   (item.sigla != null && item.sigla != '' && item.sigla.toLowerCase().indexOf(valor) == 0))
					{
						//Coincide
					}
					else
					{
						//No coincide con ningun valor
						coincide = false;
					}
				}
			});
			if(coincide){
				data.push(item)
			}
		});      
		return data;
}}]);