/**
    Especialidades de manera persistente.
*/

(function() {
    var labs = angular.module('lab');

    labs.service('especialidadesService', function () {
        var especialidades = null;

        return {
            getEspecialidades: function () {
                return especialidades;
            },
            setEspecialidades: function(value) {
                especialidades = value;
            },
            addEspecialidad: function(especialidad)
            {
                var especialidades = this.getEspecialidades();
                especialidades.push(especialidad);
                this.setEspecialidades(especialidades);
            }
        };
    });
    
})();
