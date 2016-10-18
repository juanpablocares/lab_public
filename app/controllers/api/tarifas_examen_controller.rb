class Api::TarifasExamenController < ApplicationController
  def index
	render json: TarifaExamen.all
  end
  
	def show
		if @results = TarifaExamen.find(params[:id])
			render json: {
		          success: true,
		          message: 'Tarifa Examen encontrado',
		          tarifa_examen: @results,
		        }, status: 200, include: [:examen]
		end
	end
  
  def show_examen
		if @results = TarifaExamen.where(examen_id: params[:examen_id]).order(:tarifa_id)
			render json: {
		          success: true,
		          message: 'Tarifa examen encontrado',
		          tarifa_examen: @results,
		        }, status: 200
		else
			render json: {
		          success: false,
		          message: 'Taria examen no encontrado',
		          tarifa_examen: @results,
		        }, status: 500
		end
	end
	
	def range
		results = TarifaExamen.where(tarifa_id: params[:tarifa_id])
		
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
		results = results.order(examen_id: :asc).limit(params[:number].to_i).offset(params[:start].to_i)
		render json: {
			  success: true,
			  message: 'Tarifas Examen encontrados',
			  numberOfPages: numberOfPages,
			  data: results,
			}, status: 200, include: [:examen]
	end
	
	def update
		@results = TarifaExamen.find(params[:id])
		if @results.update_attributes(tarifa_examen_params)
			render json: {
		          success: true,
		          message: 'Tarifa Examen successfully modified',
		          tarifa_examen: @results,
		        }, status: 200
		else
			render json: {
		          success: false,
		          message: 'Tarifa Examen cannot be updated',
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
				@tmp.tipo_pago = r["tipo_pago"]
				proceso_examen = ProcesoExamen.where("codigo like ?", r["proceso_examen"]).first
				if proceso_examen != nil
					@tmp.proceso_examen_id = proceso_examen.id
				else 
					@tmp.proceso_examen_id = nil
				end
				procesador_examen = ProcesadorExamen.where("codigo like ?", r["procesador_examen"]).first
				if procesador_examen != nil
					@tmp.procesador_examen_id = procesador_examen.id
				else 
					@tmp.procesador_examen_id = nil
				end
				autorizado_fonasa = r["autorizado_fonasa"] 
				if autorizado_fonasa.downcase! == 'si'
					@tmp.autorizado_fonasa = true
				else
					@tmp.autorizado_fonasa = false
				end
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
	
	
		@result = params[:tarifas_examen]
		@result.each do |r|
			@tmp = TarifaExamen.where(examen_id: r["examen_id"]).where(tarifa_id: r["tarifa_id"]).first
			if @tmp != nil
				@tmp.precio = r["precio"]
				if r["precio_fonasa"] != nil
					@tmp.precio_fonasa = r["precio_fonasa"]
				end
				@tmp.save
			else
				tarifa = TarifaExamen.new
				tarifa.examen_id = r["examen_id"]
				tarifa.tarifa_id = r["tarifa_id"]
				tarifa.precio = r["precio"]
				tarifa.precio_fonasa = r["precio_fonasa"]
				tarifa.save
			end
		end
		render json: {
			  success: true,
			  message: 'Tarifa Examen successfully modified',
			}, status: 200
	end
	
	def tarifa_examen_params
		params.permit(:tarifa_id, :examen_id, :precio, :precio_fonasa)
	end
end
