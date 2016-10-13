class AddTipoPagoToExamenes < ActiveRecord::Migration
  def change
    add_column :examenes, :tipo_pago, :string
  end
end
