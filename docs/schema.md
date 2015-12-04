# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## matches
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
start_time      | date      |
map             | string    | not null
current_round   | integer   | default: 0
prize_pool      | integer   | default: 0
has_started     | boolean   | default: false
is_current      | boolean   | default: true
winner_id       | integer   | foreign key

## teams
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null, unique
odds            | float     | not null
avatar_url      | string    |
rounds_won      | integer   | default: 0
match_id        | integer   | foreign key

## match_linups
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
match_id        | string    | not null, foreign key
team_id         | integer   | not null, foreign key

## items
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null
price           | float     | not null
gun_type        | string    | not null
condition       | string    | not null
rarity          | string    | not null
is_stattrack    | boolean   | default: false
is_souvenir     | boolean   | default: false
image_url       | string    | not null
user_id         | integer   | foreign key
bet_id          | integer   | foreign key

## bets
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
total_value     | float     | not null
user_id         | integer   | not null, foreign key
match_id        | integer   | not null, foreign key
team_id         | integer   | not null, foreign key
