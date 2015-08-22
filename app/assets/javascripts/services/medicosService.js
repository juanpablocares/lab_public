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
            }
        };
    });
    
})();
