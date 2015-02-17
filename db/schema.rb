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

ActiveRecord::Schema.define(version: 20150217045531) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comunas", id: :bigserial, force: :cascade do |t|
    t.string  "nombre",    limit: 200, null: false
    t.integer "region_id", limit: 8,   null: false
  end

  create_table "cotizaciones", id: :bigserial, force: :cascade do |t|
    t.integer  "paciente_id",        limit: 8,                   null: false
    t.integer  "procedencia_id",     limit: 8,                   null: false
    t.integer  "usuario_creador_id", limit: 8,                   null: false
    t.datetime "creado",                       default: "now()", null: false
  end

  create_table "detalles_cotizacion", id: :bigserial, force: :cascade do |t|
    t.integer  "cotizacion_id",    limit: 8,                   null: false
    t.integer  "examen_id",        limit: 8,                   null: false
    t.integer  "perfil_examen_id", limit: 8
    t.datetime "creado",                     default: "now()", null: false
  end

  create_table "detalles_ficha", id: :bigserial, force: :cascade do |t|
    t.integer  "ficha_id",           limit: 8,                   null: false
    t.integer  "examen_id",          limit: 8,                   null: false
    t.integer  "perfil_examen_id",   limit: 8
    t.integer  "usuario_muestra_id", limit: 8
    t.datetime "fecha_muestra"
    t.integer  "tipo_muestra_id",    limit: 8
    t.datetime "creado",                       default: "now()", null: false
  end

  create_table "detalles_pagos_ficha", id: :bigserial, force: :cascade do |t|
    t.integer  "ficha_id",     limit: 8,                   null: false
    t.integer  "tipo_pago_id", limit: 8,                   null: false
    t.integer  "prevision_id", limit: 8,                   null: false
    t.integer  "monto_pagado", limit: 8,                   null: false
    t.datetime "creado",                 default: "now()", null: false
  end

  create_table "examenes", id: :bigserial, force: :cascade do |t|
    t.integer  "codigo_fonasa",                               null: false
    t.string   "nombre",        limit: 200,                   null: false
    t.string   "codigo",        limit: 500,                   null: false
    t.integer  "externo",                                     null: false
    t.datetime "creado",                    default: "now()", null: false
  end

  create_table "examenes_perfil", primary_key: "examen_id", force: :cascade do |t|
    t.integer  "perfil_id", limit: 8,                   null: false
    t.datetime "creado",              default: "now()", null: false
  end

  create_table "fichas", id: :bigserial, force: :cascade do |t|
    t.integer  "paciente_id",        limit: 8,                   null: false
    t.integer  "procedencia_id",     limit: 8,                   null: false
    t.integer  "orden_medica_id",    limit: 8
    t.integer  "usuario_creador_id", limit: 8,                   null: false
    t.datetime "creado",                       default: "now()", null: false
  end

  create_table "indicadores", id: :bigserial, force: :cascade do |t|
    t.integer  "sustancia_id", limit: 8,                   null: false
    t.integer  "minimo",                                   null: false
    t.integer  "maximo",                                   null: false
    t.integer  "nombre_rango",                             null: false
    t.datetime "creado",                 default: "now()", null: false
  end

  create_table "laboratorios", id: :bigserial, force: :cascade do |t|
    t.string   "nombre", limit: 100,                   null: false
    t.datetime "creado",             default: "now()", null: false
  end

  create_table "medicos", id: :bigserial, force: :cascade do |t|
    t.string   "rut",              limit: 20,                    null: false
    t.string   "rutdv",            limit: 1,                     null: false
    t.string   "nombre",           limit: 100,                   null: false
    t.string   "apellido_paterno", limit: 100,                   null: false
    t.string   "apellido_materno", limit: 100
    t.datetime "creado",                       default: "now()", null: false
  end

  create_table "ordenes_medicas", id: :bigserial, force: :cascade do |t|
    t.integer  "paciente_id", limit: 8,                   null: false
    t.integer  "medico_id",   limit: 8,                   null: false
    t.datetime "creado",                default: "now()", null: false
  end

  create_table "pacientes", id: :bigserial, force: :cascade do |t|
    t.string   "rut",                limit: 20,                    null: false
    t.string   "rutdv",              limit: 1
    t.string   "nombre",             limit: 100,                   null: false
    t.string   "apellido_paterno",   limit: 100,                   null: false
    t.string   "apellido_materno",   limit: 100
    t.string   "celular",            limit: 30
    t.string   "telefono",           limit: 30
    t.string   "direccion",          limit: 500
    t.integer  "comuna_id",          limit: 8,                     null: false
    t.date     "fecha_nacimiento",                                 null: false
    t.integer  "genero",                                           null: false
    t.text     "diagnostico"
    t.integer  "prevision_id",                                     null: false
    t.integer  "usuario_creador_id", limit: 8,                     null: false
    t.datetime "creado",                         default: "now()", null: false
  end

  create_table "perfiles", id: :bigserial, force: :cascade do |t|
    t.string   "nombre",   limit: 300,                   null: false
    t.string   "codigo",   limit: 300,                   null: false
    t.datetime "creado\t",             default: "now()", null: false
  end

  create_table "permisos", id: :bigserial, force: :cascade do |t|
    t.string   "nombre", limit: 100,                   null: false
    t.datetime "creado",             default: "now()", null: false
  end

  create_table "permisos_rol", primary_key: "rol_id", force: :cascade do |t|
    t.integer  "permiso_id", limit: 8,                   null: false
    t.datetime "creado",               default: "now()", null: false
  end

  create_table "precios", primary_key: "tramo_id", force: :cascade do |t|
    t.integer  "examen_id", limit: 8,                   null: false
    t.integer  "precio",                                null: false
    t.datetime "creado",              default: "now()", null: false
  end

  create_table "previsiones", id: :bigserial, force: :cascade do |t|
    t.string   "nombre",     limit: 100,                   null: false
    t.string   "codigo",     limit: 10,                    null: false
    t.boolean  "habilitada",                               null: false
    t.datetime "creado",                 default: "now()", null: false
  end

  create_table "procedencias", id: :bigserial, force: :cascade do |t|
    t.string   "nombre", limit: 100,                   null: false
    t.datetime "creado",             default: "now()", null: false
  end

  create_table "regiones", id: :bigserial, force: :cascade do |t|
    t.string "nombre", limit: 200, null: false
  end

  create_table "resultados_examen", id: :bigserial, force: :cascade do |t|
    t.integer  "sustancia_id",       limit: 8,                   null: false
    t.integer  "detalle_ficha_id",   limit: 8,                   null: false
    t.integer  "cantidad_sustancia",                             null: false
    t.datetime "creado",                       default: "now()", null: false
  end

  create_table "roles", id: :bigserial, force: :cascade do |t|
    t.string   "nombre", limit: 200, null: false
    t.datetime "creado",             null: false
  end

  create_table "roles_usuario", id: :bigserial, force: :cascade do |t|
    t.integer  "usuario_id", limit: 8,                   null: false
    t.integer  "rol_id",     limit: 8,                   null: false
    t.datetime "creado",               default: "now()", null: false
  end

  create_table "sucursales", id: :bigserial, force: :cascade do |t|
    t.string   "nombre",         limit: 100,                   null: false
    t.string   "direccion",      limit: 300,                   null: false
    t.integer  "comuna_id",      limit: 8,                     null: false
    t.integer  "laboratorio_id", limit: 8,                     null: false
    t.datetime "creado",                     default: "now()", null: false
  end

  create_table "sustancias", id: :bigserial, force: :cascade do |t|
    t.string   "nombre", limit: 100,                   null: false
    t.string   "unidad", limit: 20,                    null: false
    t.datetime "creado",             default: "now()", null: false
  end

  create_table "tipos_muestras", force: :cascade do |t|
    t.string   "muestra", limit: 200,                   null: false
    t.string   "codigo",  limit: 100,                   null: false
    t.datetime "creado",              default: "now()", null: false
  end

  create_table "tipos_pago", id: :bigserial, force: :cascade do |t|
    t.string   "nombre", limit: 50,                   null: false
    t.datetime "creado",            default: "now()", null: false
  end

  create_table "tramos", id: :bigserial, force: :cascade do |t|
    t.integer  "prevision_id", limit: 8,                     null: false
    t.string   "nombre",       limit: 100,                   null: false
    t.boolean  "alerta",                                     null: false
    t.datetime "creado",                   default: "now()", null: false
  end

  create_table "users", id: :bigserial, force: :cascade do |t|
    t.string   "rut",              limit: 20
    t.string   "rutdv",            limit: 1
    t.string   "nombre",           limit: 60
    t.string   "apellido_paterno", limit: 60
    t.string   "apellido_materno", limit: 60
    t.string   "telefono",         limit: 30
    t.datetime "creado",                      default: "now()", null: false
  end

  create_table "usuarios", id: :bigserial, force: :cascade do |t|
    t.string   "rut",                    limit: 20
    t.string   "rutdv",                  limit: 1
    t.string   "nombre",                 limit: 60
    t.string   "apellido_paterno",       limit: 60
    t.string   "apellido_materno",       limit: 60
    t.string   "telefono",               limit: 30
    t.datetime "creado",                            default: "now()", null: false
    t.string   "email",                             default: "",      null: false
    t.string   "encrypted_password",                default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                     default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
  end

  add_index "usuarios", ["email"], name: "index_usuarios_on_email", unique: true, using: :btree
  add_index "usuarios", ["reset_password_token"], name: "index_usuarios_on_reset_password_token", unique: true, using: :btree

  create_table "usuarios_sucursal", primary_key: "usuario_id", force: :cascade do |t|
    t.integer  "sucursal_id", limit: 8,                   null: false
    t.datetime "creado",                default: "now()", null: false
  end

  add_foreign_key "comunas", "regiones", column: "region_id", name: "region", on_update: :restrict, on_delete: :restrict
  add_foreign_key "cotizaciones", "pacientes", name: "cotizaciones_paciente_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "cotizaciones", "procedencias", name: "cotizaciones_procedencia_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_cotizacion", "cotizaciones", column: "cotizacion_id", name: "detalles_cotizacion_cotizacion_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_cotizacion", "examenes", column: "examen_id", name: "detalles_cotizacion_examen_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_cotizacion", "perfiles", column: "perfil_examen_id", name: "detalles_cotizacion_perfil_examen_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_ficha", "examenes", column: "examen_id", name: "detalles_ficha_examen_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_ficha", "fichas", name: "detalles_ficha_ficha_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_ficha", "perfiles", column: "perfil_examen_id", name: "detalles_ficha_perfil_examen_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_ficha", "tipos_muestras", column: "tipo_muestra_id", name: "detalles_ficha_tipo_muestra_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_ficha", "usuarios", column: "usuario_muestra_id", name: "detalles_ficha_usuario_muestra_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_pagos_ficha", "fichas", name: "detalles_pagos_ficha_ficha_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_pagos_ficha", "previsiones", column: "prevision_id", name: "detalles_pagos_ficha_prevision_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "detalles_pagos_ficha", "tipos_pago", column: "tipo_pago_id", name: "detalles_pagos_ficha_tipo_pago_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "examenes_perfil", "examenes", column: "examen_id", name: "examenes_perfil_examen_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "examenes_perfil", "perfiles", column: "perfil_id", name: "examenes_perfil_perfil_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "fichas", "ordenes_medicas", column: "orden_medica_id", name: "fichas_orden_medica_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "fichas", "pacientes", name: "fichas_paciente_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "fichas", "procedencias", name: "fichas_procedencia_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "fichas", "usuarios", column: "usuario_creador_id", name: "fichas_usuario_creador_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "indicadores", "sustancias", name: "indicadores_sustancia_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "ordenes_medicas", "medicos", name: "ordenes_medicas_medico_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "ordenes_medicas", "pacientes", name: "ordenes_medicas_paciente_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "pacientes", "comunas", name: "pacientes_comuna_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "pacientes", "previsiones", column: "prevision_id", name: "pacientes_prevision_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "pacientes", "usuarios", column: "usuario_creador_id", name: "pacientes_usuario_creador_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "permisos_rol", "permisos", name: "permisos_rol_permiso_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "permisos_rol", "roles", column: "rol_id", name: "permisos_rol_rol_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "precios", "examenes", column: "examen_id", name: "precios_examen_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "precios", "tramos", name: "precios_tramo_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "resultados_examen", "detalles_ficha", column: "detalle_ficha_id", name: "resultados_examen_detalle_ficha_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "resultados_examen", "sustancias", name: "resultados_examen_sustancia_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "roles_usuario", "roles", column: "rol_id", name: "roles_usuario_rol_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "roles_usuario", "usuarios", name: "roles_usuario_usuario_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "sucursales", "comunas", name: "sucursales_comuna_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "sucursales", "laboratorios", name: "sucursales_laboratorio_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "tramos", "previsiones", column: "prevision_id", name: "tramos_prevision_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "usuarios_sucursal", "sucursales", column: "sucursal_id", name: "usuarios_sucursal_sucursal_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "usuarios_sucursal", "usuarios", name: "usuarios_sucursal_usuario_id_fkey", on_update: :cascade, on_delete: :cascade
end
