class Api::Fichas::ShowController < Api::FichasController

	def index
		if @results = Ficha.includes(
        {:paciente => [:prevision,:comuna]},
        :medico,
        :user,
        :prevision,
        :procedencia,
        {:detalles_ficha => [
           :resultados_examen,
           :perfil, {
             :examen => [
               :indicacion,
               :tipo_examen,
           :tarifas_examen]}
      ]})
      .find(params[:id])
      render json: {
        success: true,
        message: '[show] Ficha encontrada',
        data: @results,
      }, status: 200, include: [
        {:paciente => {include: [:prevision, :comuna]}},
        :medico,
        :user,
        :prevision,
        :procedencia,
        {
          :detalles_ficha => {
            include: [
              :usuario_muestra,
              {
                :resultados_examen => {
                  include:
                  [
                    {
                      :examen_parametro => {
                        include: [
                          {:parametro => {include: [:valor_parametro]}}
                        ]
                      }
                    }
                  ]
                }
              },
              :perfil,
              {
                :examen => {
                  include: [
                    {
                      :examenes_parametros => {
                        include: [
                          {:parametro => {include: [:valor_parametro]}}
                        ]
                      }
                    },
                    :indicacion,
                    :tipo_examen,
                    :tarifas_examen
                  ]
                }
              }
            ]
          }
        }]
    end
	end

end
