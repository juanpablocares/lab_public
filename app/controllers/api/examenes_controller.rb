class Api::ExamenesController < ApplicationController

	def filtrar_tarifas
		results = Examen.all.order(:id)
		render json: {
          success: true,
          message: 'Examenes encontrados con sus tarifas',
          data: results,
        }, status: 200, include: [
        	{:tarifas_examen => {include: {:find_by_tarifa => {:params => params[:id] }}}}
        	] 
	end

	def show
		if @results = Examen.find(params[:id])
			render json: {
		          success: true,
		          message: 'Examen encontrado',
		          examen: @results,
		        }, status: 200, include: [:tarifas_examen, :indicacion, :tipo_examen, :tipo_muestra, :alias_examenes, :horaproceso_examenes, :proceso_examen, :procesador_examen, :modificacion_examenes]
		else
			render json: {
		          success: false,
		          message: 'Examen no encontrado',
		          examen: @results,
		        }, status: 500
		end
	end
	
	def range
		results = Examen.all
		
		if(params.has_key?(:search))
			if(params[:search].has_key?(:predicateObject))
				if(params[:search][:predicateObject].has_key?(:nombre))
					results = results.where('lower(examenes.nombre) like ?',"%#{params[:search][:predicateObject][:nombre].downcase}%")
				end
				if(params[:search][:predicateObject].has_key?(:codigo_fonasa))
					results = results.where('lower(examenes.codigo_fonasa) like ?',"%#{params[:search][:predicateObject][:codigo_fonasa].downcase}%")
				end
				if(params[:search][:predicateObject].has_key?(:codigo))
					results = results.where('lower(examenes.codigo) like ?',"%#{params[:search][:predicateObject][:codigo].downcase}%")
				end
			end
		end
		
		numberOfPages = results.count / params[:number].to_i
		results = results.order(nombre: :asc).limit(params[:number].to_i).offset(params[:start].to_i)
		render json: {
			  success: true,
			  message: 'Examenes encontrados',
			  numberOfPages: numberOfPages,
			  data: results,
			}, status: 200, include: [:tarifas_examen, :indicacion, :tipo_examen]
	end

	def index
		@examenes = Examen.all
		render json: {
		          success: true,
		          message: 'Listado de examenes encontrado',
		          data: @examenes,
		        }, status: 200, include: [:tarifas_examen, :indicacion, :tipo_examen]
	end
	
	def select
		#@examenes = Examen.select(:id, :codigo_fonasa, :codigo, :nombre, :tarifas_examen.tarifa_id, :tarifas_examen.precio).includes(:tarifas_examen).all

		@examenes = Examen.select(:id, :codigo_fonasa, :codigo, :nombre).all.order(:nombre)
		
		render json: {
		          success: true,
		          message: 'Listado de examenes encontrado',
		          examenes: @examenes,
		        }, status: 200, include: [:tarifas_examen]
	end
	
	def update
		@results = Examen.find(params[:id])
		if @results.update_attributes(examen_params)
			render json: {
		          success: true,
		          message: 'Examen successfully modified',
		          examen: @results
		        }, status: 200
		else
			render json: {
		          success: false,
		          message: 'Examen cannot be updated',
		          errors: @results.errors,
		        }, status: 500
		end
	end
	
	def update_all
		@result = params[:examenes]
		@result.each do |r|
			@tmp = Examen.where(id: r["id"]).first
			if @tmp != nil
				@tmp.nombre = r["nombre"]
				@tmp.codigo = r["codigo"]
				@tmp.codigo_fonasa = r["codigo_fonasa"]
				@tmp.save
			else
				examen = Examen.new
				examen.examen_id = r["examen_id"]
				examen.tarifa_id = r["tarifa_id"]
				examen.precio = r["precio"]
				examen.precio_fonasa = r["precio_fonasa"]
				examen.save
			end
		end
		render json: {
			  success: true,
			  message: 'Examen successfully modified',
			}, status: 200
	end
	
	def create
		@examen = Examen.new(examen_params)
		if @examen.save
			render json: {
	          success: true,
	          message: 'Examen successfully created',
	          data: @examen,
	        }, status: 200
		else
			render json: {
	          success: false,
	          message: 'Examen cannot be created',
	          data: @examen.errors,
	        }, status: 500
		end
	end
	
	def examen_params
		params.permit(:codigo_fonasa, :nombre, :codigo, :externo, :procedencia, :indicacion_id, :tipo_examen_id, :tipo_muestra_id, :demora_proceso, :creador, :nombre_impreso, :sigla, :proceso, :area_trabajo, :volumen_minimo, :condiciones_transporte, :maximo_toma_muestra, :unidad_medida, :metodo, :metodo_abreviado, :proceso_lunes, :proceso_martes, :proceso_miercoles, :proceso_jueves, :proceso_viernes, :proceso_sabado, :principio_metodo, :interferentes, :calculos, :proposito, :analista_responsable, :rechazo_hemolisis, :rechazo_proteccion_luz, :rechazo_lipemia, :rechazo_ictericia, :rechazo_tubo, :rechazo_otros, :observaciones, :entrega, :indicacion_muestra_id, :tapa_tubo_id, :tipo_envase_id, :proceso_examen_id, :procesador_examen_id, :autorizado_fonasa, :tipo_pago, :interno)
	end
end
