class Api::DetallesFichaController < ApplicationController
	def index
		render json: DetalleFicha.all
	end

	def get_by_paciente
		
		results = DetalleFicha.joins(ficha: :paciente).joins(:examen).where(pacientes: {id: params[:id]})
		
		results.order(fecha_muestra: :desc).limit(params[:number].to_i).offset(params[:start].to_i)
		numberOfPages = results.count / params[:number].to_i
		render json: {
			  success: true,
			  message: 'Muestras por paciente encontradas',
			  numberOfPages: numberOfPages,
			  data: results,
			}, status: 200, include: [{:examen=> {include: [:sustancias]}}, :perfil, :resultados_examen, {:ficha => {include: [:paciente]}}]
	end

	def muestras_tomadas
		results = DetalleFicha.joins(ficha: :paciente).joins(:examen).where.not(:usuario_muestra_id => nil)
		
		if(params.has_key?(:search))
			if(params[:search].has_key?(:predicateObject))
				if(params[:search][:predicateObject].has_key?(:id))
					results = results.where(detalles_ficha:{id: params[:search][:predicateObject][:id].to_i})
				end
				if(params[:search][:predicateObject].has_key?(:ficha_id))
					results = results.where(fichas: {id: params[:search][:predicateObject][:ficha_id].to_i})
				end
				if(params[:search][:predicateObject].has_key?(:paciente_apellido_paterno))
					results = results.where('lower(pacientes.apellido_paterno) like ?',"%#{params[:search][:predicateObject][:paciente_apellido_paterno].downcase}%")
				end
				if(params[:search][:predicateObject].has_key?(:paciente_nombre))
					results = results.where('lower(pacientes.nombre) like ?',"%#{params[:search][:predicateObject][:paciente_nombre].downcase}%")
				end
				if(params[:search][:predicateObject].has_key?(:examen_nombre))
					results = results.where('lower(examenes.nombre) like ?',"%#{params[:search][:predicateObject][:examen_nombre].downcase}%")
				end
				if(params[:search][:predicateObject].has_key?(:perfil_nombre))
					results = results.joins(:perfil).where('lower(perfiles.nombre) like ?',"%#{params[:search][:predicateObject][:perfil_nombre].downcase}%")
				end
				if(params[:search][:predicateObject].has_key?(:paciente_rut))
					rut_completo = params[:search][:predicateObject][:paciente_rut].gsub!(/[^0-9]/, '')
					rut = rut_completo[0...-1]
					dv = rut_completo[-1, 1]
					results = results.where(pacientes: {rut: rut.to_i, rutdv: dv.to_i})
				end
			end
		end
		results.order(fecha_muestra: :desc).limit(params[:number].to_i).offset(params[:start].to_i)
		numberOfPages = results.count / params[:number].to_i
		render json: {
			  success: true,
			  message: 'Muestras tomadas encontradas',
			  numberOfPages: numberOfPages,
			  data: results,
			}, status: 200, include: [:examen, :perfil, {:ficha => {include: [:paciente]}}]
	end

	def muestras
		@results = DetalleFicha.where(:usuario_muestra_id => nil)
		@numberOfPages = Ficha.joins(:detalles_ficha).where(:detalles_ficha => {:usuario_muestra_id => nil}).count / params[:number].to_i
		render json: {
			  success: true,
			  message: 'Muestras encontradas',
			  numberOfPages: @numberOfPages,
			  data: @results,
			}, status: 200
	end

	def show
		if @results = DetalleFicha.find(params[:id])
			render json: {
		          success: true,
		          message: 'Detalles Ficha encontrado',
		          detalle_ficha: @results,
		        }, status: 200
		end
	end

	def update
		@results = DetalleFicha.find(params[:id])
		if @results.update_attributes(detalles_ficha_params)
			render json: {
		          success: true,
		          message: 'Detalle ficha successfully modified',
		          detalle_ficha: @results,
		        }, status: 200
		else
			render json: {
		          success: false,
		          message: 'Detalle ficha cannot be updated',
		          errors: @results.errors,
		        }, status: 500
		end
	end

	def detalles_ficha_params
		params.permit(:examen_id, :perfil_id, :usuario_muestra_id, :fecha_muestra, :tipo_muestra_id)
	end
end
