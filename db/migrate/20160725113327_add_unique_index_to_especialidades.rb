class AddUniqueIndexToEspecialidades < ActiveRecord::Migration
  def change

  	duplicates = Especialidad.select('codigo, count(*)').group('codigo').having('count(*)>1').pluck(:codigo)

  	duplicates.each do |codigo|
	  medicos = Medico.joins(:especialidad).where(especialidades: {codigo: codigo})
	  fichas = Ficha.joins(:medico).where(medicos: {id: medicos})
	  cotizaciones = Cotizacion.joins(:medico).where(medicos: {id: medicos})
	  especialidades = Especialidad.where(codigo: codigo).order(id: :desc)[1..-1]
	  
	  fichas.map(&:destroy)
	  cotizaciones.map(&:destroy)
	  medicos.map(&:destroy)
	  especialidades.map(&:destroy)
	end

  	add_index :especialidades, :codigo, :unique => true
  end
end
