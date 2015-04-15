class Api::FichasController < ApplicationController
	def index
		if @results = Ficha.all
			render json: {
		          success: true,
		          message: '[index] Fichas encontradas',
		          data: @results,
		        }, status: 200, include: [:paciente, :orden_medica, :procedencia, :detalles_ficha]
		end
	end

	def show
		if @results = Ficha.includes({
			:paciente => [:prevision]},
			:orden_medica,
			:procedencia, {
			:detalles_ficha => [
				:perfil, {
				:examen => [
					:tarifas_examen]}
			   	]})
			   .find(params[:id])
			render json: {
		          success: true,
		          message: '[show] Ficha encontrada',
		          data: @results,
		        }, status: 200, include: [{:paciente => {include: [:prevision]}}, :orden_medica, :procedencia, {:detalles_ficha =>{ include: [:perfil,{:examen => { include: [:tarifas_examen]}}]}}]
		end
	end

	def pagos
		if @results = DetallePagoFicha.includes(:tipo_pago).where(	ficha_id: params[:id])
			render json: {
		          success: true,
		          message: '[pagos] Pagos encontrados',
		          data: @results,
		        }, status: 200, include: [:tipo_pago]
		end
	end

	def show_bypaciente
		@fichas = Ficha.where(paciente_id: params[:id])
		render json: {
		          success: true,
		          message: '[Paciente] Fichas del paciente indicado encontradas',
		          fichas: @fichas,
		        }, status: 200, include: [:orden_medica, :procedencia]
	end

	def muestras
		@results = Ficha.includes(:detalles_ficha).where(:detalles_ficha => {:usuario_muestra_id => nil})
		@numberOfPages = Ficha.includes(:detalles_ficha).where(:detalles_ficha => {:usuario_muestra_id => nil}).count / params[:number].to_i
		render json: {
			  success: true,
			  message: 'Muestras encontradas',
			  numberOfPages: @numberOfPages,
			  data: @results,
			}, status: 200, include: [:paciente, :orden_medica, :procedencia, :detalles_ficha]
	end

	def range

		if params[:search] && params[:search][:predicateObject] && params[:search][:predicateObject][:id]
			@results = Ficha.where(id: params[:search][:predicateObject][:id].to_i)
			@numberOfPages = Ficha.count / params[:number].to_i
			render json: {
		          data:  @results,
		          message: 'Resultado correcto',
		          numberOfPages: @numberOfPages
		        }, status: 200, include: [:paciente, :orden_medica]
		else
			@results = Ficha.limit(params[:number].to_i).offset(params[:start].to_i)
			@numberOfPages = Ficha.count / params[:number].to_i
			render json: {
				success: true,
				data:  @results,
		        message: 'Resultado correcto',
		        numberOfPages: @numberOfPages,
		    }, status: 200, include: [:paciente, :orden_medica]
		end
	end

	def create
		ficha = Ficha.new
		ficha.paciente_id = params[:paciente_id]
		ficha.procedencia_id = params[:procedencia_id]
		ficha.orden_medica_id = nil
		ficha.user_id = current_user.id

		if params[:examenes] != nil && params[:examenes].length > 0
			if !ficha.save
				raise "Error saving ficha"
			else
				params[:examenes].each do |ex|
					if ex[:perfil]
						ex[:examenes].each do |exa|
							detalle = DetalleFicha.new
							detalle.ficha_id = ficha.id
							detalle.examen_id = exa[:id]
							detalle.perfil_examen_id = ex[:id]
							if !detalle.save
								raise "Error saving detalle_ficha"
							end
						end
					else
						detalle = DetalleFicha.new
						detalle.ficha_id = ficha.id
						detalle.examen_id = ex[:id]
						detalle.perfil_examen_id = nil
						if !detalle.save
							raise "Error saving detalle_ficha"
						end
					end
				end
				render json:
				{
					data:  ficha,
		        	message: 'ficha creada',
		        }, status: 200
			end
		else
			raise "No hay exámenes"
		end
	end
end
