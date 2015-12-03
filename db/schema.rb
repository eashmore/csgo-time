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

ActiveRecord::Schema.define(version: 20151203220231) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bets", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "match_id"
    t.integer  "team_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.float    "total_value"
  end

  add_index "bets", ["match_id"], name: "index_bets_on_match_id", using: :btree
  add_index "bets", ["team_id"], name: "index_bets_on_team_id", using: :btree
  add_index "bets", ["user_id"], name: "index_bets_on_user_id", using: :btree

  create_table "itemdbs", force: :cascade do |t|
    t.string   "name"
    t.float    "price"
    t.string   "gun_type"
    t.string   "condition"
    t.string   "rarity"
    t.boolean  "is_stattrack", default: false
    t.boolean  "is_souvenir",  default: false
    t.string   "image_url"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  create_table "items", force: :cascade do |t|
    t.string   "name"
    t.float    "price"
    t.string   "gun_type"
    t.string   "condition"
    t.string   "rarity"
    t.boolean  "is_stattrack", default: false
    t.boolean  "is_souvenir",  default: false
    t.string   "image_url"
    t.integer  "user_id"
    t.integer  "bet_id"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  add_index "items", ["bet_id"], name: "index_items_on_bet_id", using: :btree
  add_index "items", ["user_id"], name: "index_items_on_user_id", using: :btree

  create_table "match_lineups", force: :cascade do |t|
    t.integer  "match_id"
    t.integer  "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "match_lineups", ["match_id"], name: "index_match_lineups_on_match_id", using: :btree
  add_index "match_lineups", ["team_id"], name: "index_match_lineups_on_team_id", using: :btree

  create_table "matches", force: :cascade do |t|
    t.boolean  "has_started",   default: false
    t.integer  "current_round", default: 1
    t.integer  "winner_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.float    "start_time"
    t.string   "map"
    t.integer  "prize_pool",    default: 0
    t.boolean  "has_ended",     default: false
    t.boolean  "is_current",    default: true
  end

  add_index "matches", ["winner_id"], name: "index_matches_on_winner_id", using: :btree

  create_table "teams", force: :cascade do |t|
    t.string   "name"
    t.float    "odds",       default: 1.0
    t.string   "avatar_url", default: ""
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "rounds_won", default: 0
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
