json.array!(@pruebas) do |prueba|
  json.extract! prueba, :id, :campo1
  json.url prueba_url(prueba, format: :json)
end
