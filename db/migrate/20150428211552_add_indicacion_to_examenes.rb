class AddIndicacionToExamenes < ActiveRecord::Migration
	def change
		add_reference :examenes, :indicacion, index: true
		add_foreign_key :examenes, :indicaciones
	end
end
