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
					if((item.nombre != null && item.nombre != '' && item.nombre.toLowerCase().indexOf(valor) != -1) ||
					   (item.nombre_impreso != null && item.nombre_impreso != '' && item.nombre_impreso.toLowerCase().indexOf(valor) == 0) ||
					   (item.codigo != null && item.codigo != '' && item.codigo.toLowerCase().indexOf(valor) == 0) ||
					   (item.codigo_fonasa != null && item.codigo_fonasa != '' && item.codigo_fonasa.toLowerCase().indexOf(valor) == 0) ||
					   (item.sigla != null && item.sigla != '' && item.sigla.toLowerCase().indexOf(valor) == -1))
					{
						//Coincide
						if(item.nombre != null && item.nombre != '' && item.nombre.indexOf(valor) != -1)
							console.log("COINCIDE NOMBRE "+ item.nombre);
						if(item.nombre_impreso != null && item.nombre_impreso != '' && item.nombre.indexOf(valor) != -1)
							console.log("COINCIDE nombre_impreso "+ item.nombre_impreso);
						if(item.codigo != null && item.codigo != '' && item.nombre.indexOf(valor) != -1)
							console.log("COINCIDE codigo "+ item.codigo);
						if(item.codigo_fonasa != null && item.codigo_fonasa != '' && item.codigo_fonasa.indexOf(valor) != -1)
							console.log("COINCIDE codigo_fonasa "+ item.codigo_fonasa);
						if(item.sigla != null && item.sigla != '' && item.sigla.indexOf(valor) != -1)
							console.log("COINCIDE sigla "+ item.sigla);
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