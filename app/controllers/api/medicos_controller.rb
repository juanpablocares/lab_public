class Api::MedicosController < ApplicationController
	def index
		medicos = Medico.all
		render json: {
		          success: true,
		          message: 'Listado de medicos encontrado',
		          data: medicos,
		        }, status: 200
	end
	
	def cantidades_ficha
		
		@result = Ficha.joins(:medico => :especialidad).group('especialidades.nombre').count
		
		if @result != nil
		
			render json: {
				success: true,
				message: '[cantidades] Fichas por medico encontradas',
				data: @result,
			}, status: 200
		end
	end
  
	def cantidades_total
		
		@result = Medico.joins(:especialidad).group('especialidades.nombre').count
		if @result != nil
		
			render json: {
				success: true,
				message: '[cantidades] Medicos encontradas',
				data: @result,
			}, status: 200
		end
	end
	
	def range
		results = Medico.all
		
		if(params.has_key?(:search))
			if(params[:search].has_key?(:predicateObject))
				if(params[:search][:predicateObject].has_key?(:apellido_paterno))
					results = results.where('lower(medicos.apellido_paterno) like ?',"#{params[:search][:predicateObject][:apellido_paterno].downcase}%")
				end
				if(params[:search][:predicateObject].has_key?(:apellido_materno))
					results = results.where('lower(medicos.apellido_materno) like ?',"#{params[:search][:predicateObject][:apellido_materno].downcase}%")
				end
				if(params[:search][:predicateObject].has_key?(:nombre))
					results = results.where('lower(medicos.nombre) like ?',"#{params[:search][:predicateObject][:nombre].downcase}%")
				end
				if(params[:search][:predicateObject].has_key?(:especialidad))
					results = results.where(especialidad_id: params[:search][:predicateObject][:especialidad])
				end
			end
		end
		
		numberOfPages = (results.count.to_f / params[:number].to_f).ceil
		results = results.order(apellido_paterno: :asc).limit(params[:number].to_i).offset(params[:start].to_i)
		render json: {
			  success: true,
			  message: 'Medicos encontrados',
			  numberOfPages: numberOfPages,
			  data: results,
			}, status: 200, include: [:especialidad]
	end
	
	def show
		if @results = Medico.find(params[:id])
			render json: {
				  success: true,
				  message: 'Medico encontrado',
				  medico: @results,
				}, status: 200, include: [:especialidad]
		end
	end
	
	def update
		@results = Medico.find(params[:id])
		if @results.update_attributes(medico_params)
			render json: {
		          success: true,
		          message: 'Medico successfully modified',
		          medico: @results,
		        }, status: 200
		else
			render json: {
		          success: false,
		          message: 'Medico cannot be updated',
		          errors: @results.errors,
		        }, status: 500
		end
	end
	
	def delete
		if Medico.find(params[:id]).destroy
			render json: {
				  success: true,
				  message: 'Medico successfully deleted',
				}, status: 200
		else
			render json: {
				  success: false,
				  message: 'Error eliminando Medico',
				}, status: 500
		end
	end
	
	def create
		@medico = Medico.new(medico_params)
		if @medico.save
			render json: {
	          success: true,
	          message: 'Medico successfully created',
	          data: @medico,
	        }, status: 200
		else
			render json: {
	          success: false,
	          message: 'Medico cannot be created',
	          data: @medico.errors,
	        }, status: 500
		end
	end
	
	def medico_params
		params.permit(:rut, :rutdv, :nombre, :apellido_paterno, :apellido_paterno, :direccion, :especialidad_id, :institucion_id, :telefono)
	end
end
