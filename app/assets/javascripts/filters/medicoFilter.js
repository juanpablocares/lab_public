angular.module('lab').filter('medicoFilter', [function($filter) {
	return function(inputArray, texto){
		if(!angular.isDefined(texto) || texto == ''){
			return inputArray;
		}
		var data=[];
		texto = texto.trim().toLowerCase();
		texto = texto.split(' ');
		angular.forEach(inputArray, function(item){
			var nombre_completo = item.apellido_paterno.trim()+" "+
			item.apellido_materno.trim();
			nombre_completo = nombre_completo.toLowerCase();

			var coincide = true;
			angular.forEach(texto, function(valor)
			{
				if (coincide)
				{
					if(item.rut.indexOf(valor) == 0 || item.rutdv.indexOf(valor) == 0 || nombre_completo.indexOf(valor) != -1)
					{
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