/**
    Medicos de manera persistente.
*/

(function() {
    var labs = angular.module('lab');

    labs.service('institucionesService', function () {
        var instituciones = null;

        return {
            getInstituciones: function () {
                return instituciones;
            },
            setInstituciones: function(value) {
                instituciones = value;
            },
            addInstitucion: function(institucion)
            {
                var instituciones = this.getInstituciones();
                instituciones.push(institucion);
                this.setInstituciones(instituciones);
            }
        };
    });
    
})();
