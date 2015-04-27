class AddObservacionesToFichas < ActiveRecord::Migration
  def change
  	add_column :fichas, :observaciones, :string
  end
end
