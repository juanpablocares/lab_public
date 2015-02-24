# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150218193942) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comunas", force: :cascade do |t|
    t.string  "nombre",    limit: 200, null: false
    t.integer "region_id", limit: 8,   null: false
  end

  create_table "cotizaciones", force: :cascade do |t|
    t.integer  "paciente_id",    limit: 8,                                 null: false
    t.integer  "procedencia_id", limit: 8,                                 null: false
    t.integer  "user_id",        limit: 8,                                 null: false
    t.datetime "creado",                   default: '2015-02-20 15:08:40', null: false
  end

  create_table "detalles_cotizacion", force: :cascade do |t|
    t.integer  "cotizacion_id",    limit: 8,                                 null: false
    t.integer  "examen_id",        limit: 8,                                 null: false
    t.integer  "perfil_examen_id", limit: 8
    t.datetime "creado",                     default: '2015-02-20 15:08:40', null: false
  end

  create_table "detalles_ficha", force: :cascade do |t|
    t.integer  "ficha_id",           limit: 8,                                 null: false
    t.integer  "examen_id",          limit: 8,                                 null: false
    t.integer  "perfil_examen_id",   limit: 8
    t.integer  "usuario_muestra_id", limit: 8
    t.datetime "fecha_muestra"
    t.integer  "tipo_muestra_id",    limit: 8
    t.datetime "creado",                       default: '2015-02-20 15:08:40', null: false
  end

  create_table "detalles_pagos_ficha", force: :cascade do |t|
    t.integer  "ficha_id",     limit: 8,                                 null: false
    t.integer  "tipo_pago_id", limit: 8,                                 null: false
    t.integer  "prevision_id", limit: 8,                                 null: false
    t.integer  "monto_pagado", limit: 8,                                 null: false
    t.datetime "creado",                 default: '2015-02-20 15:08:40', null: false
  end

  create_table "examenes", force: :cascade do |t|
    t.integer  "codigo_fonasa",                                             null: false
    t.string   "nombre",        limit: 200,                                 null: false
    t.string   "codigo",        limit: 500,                                 null: false
    t.integer  "externo",                                                   null: false
    t.datetime "creado",                    default: '2015-02-20 15:08:40', null: false
  end

  create_table "examenes_perfil", id: false, force: :cascade do |t|
    t.integer  "examen_id", limit: 8,                                 null: false
    t.integer  "perfil_id", limit: 8,                                 null: false
    t.datetime "creado",              default: '2015-02-20 15:08:40', null: false
  end

  create_table "fichas", force: :cascade do |t|
    t.integer  "paciente_id",        limit: 8,                                 null: false
    t.integer  "procedencia_id",     limit: 8,                                 null: false
    t.integer  "orden_medica_id",    limit: 8
    t.integer  "usuario_creador_id", limit: 8,                                 null: false
    t.datetime "creado",                       default: '2015-02-20 15:08:40', null: false
  end

  create_table "indicadores", force: :cascade do |t|
    t.integer  "sustancia_id", limit: 8,                                 null: false
    t.integer  "minimo",                                                 null: false
    t.integer  "maximo",                                                 null: false
    t.integer  "nombre_rango",                                           null: false
    t.datetime "creado",                 default: '2015-02-20 15:08:40', null: false
  end

  create_table "laboratorios", force: :cascade do |t|
    t.string   "nombre", limit: 100,                                 null: false
    t.datetime "creado",             default: '2015-02-20 15:08:40', null: false
  end

  create_table "medicos", force: :cascade do |t|
    t.string   "rut",              limit: 20,                                  null: false
    t.string   "rutdv",            limit: 1,                                   null: false
    t.string   "nombre",           limit: 100,                                 null: false
    t.string   "apellido_paterno", limit: 100,                                 null: false
    t.string   "apellido_materno", limit: 100
    t.datetime "creado",                       default: '2015-02-20 15:08:40', null: false
  end

  create_table "ordenes_medicas", force: :cascade do |t|
    t.integer  "paciente_id", limit: 8,                                 null: false
    t.integer  "medico_id",   limit: 8,                                 null: false
    t.datetime "creado",                default: '2015-02-20 15:08:40', null: false
  end

  create_table "pacientes", id: :bigserial, force: :cascade do |t|
    t.string   "rut",              limit: 20,                                  null: false
    t.string   "rutdv",            limit: 1
    t.string   "nombre",           limit: 100,                                 null: false
    t.string   "apellido_paterno", limit: 100,                                 null: false
    t.string   "apellido_materno", limit: 100
    t.string   "celular",          limit: 30
    t.string   "telefono",         limit: 30
    t.string   "direccion",        limit: 500
    t.integer  "comuna_id",        limit: 8,                                   null: false
    t.date     "fecha_nacimiento",                                             null: false
    t.integer  "genero",                                                       null: false
    t.text     "diagnostico"
    t.integer  "prevision_id",                                                 null: false
    t.integer  "user_id",          limit: 8,                                   null: false
    t.datetime "creado",                       default: '2015-02-20 15:08:40', null: false
  end

  create_table "perfiles", force: :cascade do |t|
    t.string   "nombre",   limit: 300,                                 null: false
    t.string   "codigo",   limit: 300,                                 null: false
    t.datetime "creado\t",             default: '2015-02-20 15:08:40', null: false
  end

  create_table "permisos", force: :cascade do |t|
    t.string   "nombre", limit: 100,                                 null: false
    t.datetime "creado",             default: '2015-02-20 15:08:40', null: false
  end

  create_table "permisos_rol", id: false, force: :cascade do |t|
    t.integer  "rol_id",     limit: 8,                                 null: false
    t.integer  "permiso_id", limit: 8,                                 null: false
    t.datetime "creado",               default: '2015-02-20 15:08:40', null: false
  end

  add_index "permisos_rol", ["rol_id", "permiso_id"], name: "permisos_rol_rol_id_permiso_id_key", unique: true, using: :btree

  create_table "precios", id: false, force: :cascade do |t|
    t.integer  "tramo_id",  limit: 8,                                 null: false
    t.integer  "examen_id", limit: 8,                                 null: false
    t.integer  "precio",                                              null: false
    t.datetime "creado",              default: '2015-02-20 15:08:40', null: false
  end

  add_index "precios", ["tramo_id", "examen_id"], name: "tramo_examen", unique: true, using: :btree

  create_table "previsiones", force: :cascade do |t|
    t.string   "nombre",     limit: 100,                                 null: false
    t.string   "codigo",     limit: 10,                                  null: false
    t.boolean  "habilitada",                                             null: false
    t.datetime "creado",                 default: '2015-02-20 15:08:40', null: false
  end

  create_table "procedencias", force: :cascade do |t|
    t.string   "nombre", limit: 100,                                 null: false
    t.datetime "creado",             default: '2015-02-20 15:08:40', null: false
  end

  create_table "regiones", force: :cascade do |t|
    t.string "nombre", limit: 200, null: false
  end

  create_table "resultados_examen", force: :cascade do |t|
    t.integer  "sustancia_id",       limit: 8,                                 null: false
    t.integer  "detalle_ficha_id",   limit: 8,                                 null: false
    t.integer  "cantidad_sustancia",                                           null: false
    t.datetime "creado",                       default: '2015-02-20 15:08:40', null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string   "nombre", limit: 200, null: false
    t.datetime "creado",             null: false
  end

  create_table "roles_usuario", force: :cascade do |t|
    t.integer  "user_id", limit: 8,                                 null: false
    t.integer  "rol_id",  limit: 8,                                 null: false
    t.datetime "creado",            default: '2015-02-20 15:08:40', null: false
  end

  create_table "sucursales", force: :cascade do |t|
    t.string   "nombre",         limit: 100,                                 null: false
    t.string   "direccion",      limit: 300,                                 null: false
    t.integer  "comuna_id",      limit: 8,                                   null: false
    t.integer  "laboratorio_id", limit: 8,                                   null: false
    t.datetime "creado",                     default: '2015-02-20 15:08:40', null: false
  end

  create_table "sustancias", force: :cascade do |t|
    t.string   "nombre", limit: 100,                                 null: false
    t.string   "unidad", limit: 20,                                  null: false
    t.datetime "creado",             default: '2015-02-20 15:08:40', null: false
  end

  create_table "tipos_muestras", force: :cascade do |t|
    t.string   "muestra", limit: 200,                                 null: false
    t.string   "codigo",  limit: 100,                                 null: false
    t.datetime "creado",              default: '2015-02-20 15:08:40', null: false
  end

  create_table "tipos_pago", force: :cascade do |t|
    t.string   "nombre", limit: 50,                                 null: false
    t.datetime "creado",            default: '2015-02-20 15:08:40', null: false
  end

  create_table "tramos", force: :cascade do |t|
    t.integer  "prevision_id", limit: 8,                                   null: false
    t.string   "nombre",       limit: 100,                                 null: false
    t.boolean  "alerta",                                                   null: false
    t.datetime "creado",                   default: '2015-02-20 15:08:40', null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               limit: 255,              null: false
    t.string   "uid",                    limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                      default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.string   "confirmation_token",     limit: 255
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email",      limit: 255
    t.integer  "rut"
    t.integer  "rutdv"
    t.string   "nombre",                 limit: 255
    t.string   "apellido_paterno",       limit: 255
    t.string   "apellido_materno",       limit: 255
    t.string   "email",                  limit: 255
    t.string   "telefono",               limit: 255
    t.string   "direccion",              limit: 255
    t.text     "tokens"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree

  create_table "users_sucursal", id: false, force: :cascade do |t|
    t.integer  "user_id",     limit: 8,                                 null: false
    t.integer  "sucursal_id", limit: 8,                                 null: false
    t.datetime "creado",                default: '2015-02-20 15:08:40', null: false
  end

  add_index "users_sucursal", ["user_id", "sucursal_id"], name: "user_sucursal", unique: true, using: :btree

  add_foreign_key "comunas", "regiones", name: "comunas_region_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "cotizaciones", "pacientes", name: "cotizaciones_paciente_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "cotizaciones", "procedencias", name: "cotizaciones_procedencia_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "cotizaciones", "users", name: "cotizaciones_user_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_cotizacion", "cotizaciones", name: "detalles_cotizacion_cotizacion_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_cotizacion", "examenes", name: "detalles_cotizacion_examen_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_cotizacion", "perfiles", column: "perfil_examen_id", name: "detalles_cotizacion_perfil_examen_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_ficha", "examenes", name: "detalles_ficha_examen_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_ficha", "fichas", name: "detalles_ficha_ficha_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_ficha", "perfiles", column: "perfil_examen_id", name: "detalles_ficha_perfil_examen_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_ficha", "tipos_muestras", column: "tipo_muestra_id", name: "detalles_ficha_tipo_muestra_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_ficha", "users", column: "usuario_muestra_id", name: "detalles_ficha_usuario_muestra_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_pagos_ficha", "fichas", name: "detalles_pagos_ficha_ficha_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_pagos_ficha", "previsiones", name: "detalles_pagos_ficha_prevision_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_pagos_ficha", "tipos_pago", column: "tipo_pago_id", name: "detalles_pagos_ficha_tipo_pago_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "examenes_perfil", "examenes", name: "examenes_perfil_examen_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "examenes_perfil", "perfiles", name: "examenes_perfil_perfil_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "fichas", "ordenes_medicas", column: "orden_medica_id", name: "fichas_orden_medica_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "fichas", "pacientes", name: "fichas_paciente_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "fichas", "procedencias", name: "fichas_procedencia_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "fichas", "users", column: "usuario_creador_id", name: "fichas_usuario_creador_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "indicadores", "sustancias", name: "indicadores_sustancia_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "ordenes_medicas", "medicos", name: "ordenes_medicas_medico_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "ordenes_medicas", "pacientes", name: "ordenes_medicas_paciente_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "pacientes", "comunas", name: "pacientes_comuna_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "pacientes", "previsiones", name: "pacientes_prevision_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "pacientes", "users", name: "pacientes_user_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "permisos_rol", "permisos", name: "permisos_rol_permiso_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "permisos_rol", "roles", name: "permisos_rol_rol_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "precios", "examenes", name: "precios_examen_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "precios", "tramos", name: "precios_tramo_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "resultados_examen", "detalles_ficha", column: "detalle_ficha_id", name: "resultados_examen_detalle_ficha_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "resultados_examen", "sucursales", column: "sustancia_id", name: "resultados_examen_sustancia_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "roles_usuario", "roles", name: "roles_usuario_rol_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "roles_usuario", "users", name: "roles_usuario_user_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "sucursales", "comunas", name: "sucursales_comuna_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "sucursales", "laboratorios", name: "sucursales_laboratorio_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "tramos", "previsiones", name: "tramos_prevision_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "users_sucursal", "sucursales", name: "users_sucursal_sucursal_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "users_sucursal", "users", name: "users_sucursal_user_id_fkey", on_update: :cascade, on_delete: :cascade
end
