/**
    Medicos de manera persistente.
*/

(function() {
    var labs = angular.module('lab');

    labs.service('medicosService', function () {
        var medicos = null;

        return {
            getMedicos: function () {
                return medicos;
            },
            setMedicos: function(value) {
                medicos = value;
            },
            addMedico: function(medico)
            {
                var medicos = this.getMedicos();
                medicos.push(medico);
                this.setMedicos(medicos);
            },
            removeMedico: function(medico)
            {
                var medicos = this.getMedicos();
                for (var i = medicos.length - 1; i >= 0; i--) {
                    if(medicos[i].id == medico.id)
                    {
                        medicos.splice(i,1);
                    } 
                };
                this.setMedicos(medicos);
            },
            getMedicoByRut: function(rut)
            {
                var medicos = this.getMedicos();
                for (var i = medicos.length - 1; i >= 0; i--) {
                    if(medicos[i].rut == rut)
                    {
                        return medicos[i];
                    } 
                };
            }
        };
    });
    
})();
