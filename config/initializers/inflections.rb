# Be sure to restart your server when you modify this file.

# Add new inflection rules using the following format. Inflections
# are locale specific, and you may define rules for as many different
# locales as you wish. All of these examples are active by default:
# ActiveSupport::Inflector.inflections(:en) do |inflect|
#   inflect.plural /^(ox)$/i, '\1en'
#   inflect.singular /^(ox)en/i, '\1'
#   inflect.irregular 'person', 'people'
#   inflect.uncountable %w( fish sheep )
# end

# These inflection rules are supported but not enabled by default:
# ActiveSupport::Inflector.inflections(:en) do |inflect|
#   inflect.acronym 'RESTful'
# end

ActiveSupport::Inflector.inflections do |inflect|
	inflect.irregular 'aliasExamen', 'aliasExamenes'
	inflect.irregular 'cotizacion', 'cotizaciones'
  	inflect.irregular 'detalleCotizacion', 'detallesCotizacion'
  	inflect.irregular 'detalleFicha', 'detallesFicha'
  	inflect.irregular 'detallePagoFicha', 'detallesPagosFicha'
  	inflect.irregular 'detalle_pago_ficha', 'detalles_pago_ficha'
	inflect.irregular 'especialidad', 'especialidades'
  	inflect.irregular 'examen', 'examenes'
  	inflect.irregular 'examenPerfil', 'examenesPerfil'
  	inflect.irregular 'examen_perfil', 'examenes_perfil'
	inflect.irregular 'horaprocesoExamen', 'horaprocesoExamenes'
  	inflect.irregular 'indicador', 'indicadores'
	inflect.irregular 'indicacion', 'indicaciones'
	inflect.irregular 'indicacionMuestra', 'indicacionesMuestra'
	inflect.irregular 'modificacionExamen', 'modificacionExamenes'
  	inflect.irregular 'ordenMedica', 'ordenesMedicas'
  	inflect.irregular 'perfil', 'perfiles'
  	inflect.irregular 'permisoRol', 'permisosRol'
  	inflect.irregular 'prevision', 'previsiones'
  	inflect.irregular 'procedencia', 'procedencias'
	inflect.irregular 'procesadorExamen', 'procesadoresExamenes'
	inflect.irregular 'procesoExamen', 'procesoExamenes'
  	inflect.irregular 'region', 'regiones'
  	inflect.irregular 'resultadoExamen', 'resultadosExamen'
  	inflect.irregular 'resultado_examen', 'resultados_examen'
  	inflect.irregular 'rol', 'roles'
  	inflect.irregular 'rolUser', 'rolesUser'
  	inflect.irregular 'sucursal', 'sucursales'
  	inflect.irregular 'sustancia', 'sustancias'
  	inflect.irregular 'sustanciaExamen', 'sustanciasExamen'
  	inflect.irregular 'sustancia_examen', 'sustancias_examen'
	inflect.irregular 'tapaTubo', 'tapasTubo'
	inflect.irregular 'tipoEnvase', 'tiposEnvase'
	inflect.irregular 'tipoExamen', 'tipoExamenes'
  	inflect.irregular 'tipoMuestra', 'tiposMuestras'
  	inflect.irregular 'tipoPago', 'tiposPago'
  	inflect.irregular 'tipo_pago', 'tipos_pago'
	inflect.irregular 'tarifa', 'tarifas'
  	inflect.irregular 'tarifaExamen', 'tarifasExamen'
  	inflect.irregular 'userSucursal', 'usersSucursal'
end