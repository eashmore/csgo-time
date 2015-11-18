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
start_time      | date      | not null

## teams
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null, unique
odds            | float     | not null
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
user_id         | integer   | foreign key
bet_id          | integer   | foreign key

## bets
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
total_value     | float     | not null
user_id         | integer   | not null, foreign key
match_id        | integer   | not null, foreign key
user_id         | integer   | not null, foreign key
team_id         | integer   | not null, foreign key
