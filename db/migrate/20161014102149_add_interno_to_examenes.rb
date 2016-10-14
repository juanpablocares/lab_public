class AddInternoToExamenes < ActiveRecord::Migration
  def change
    add_column :examenes, :interno, :string
  end
end
