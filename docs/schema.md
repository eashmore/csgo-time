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
match_id        | integer   |

## items
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null
price           | float     | not null
user_id         | integer   | not null
bet_id          | integer   |

## bets
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
total_value     | integer   | not null
user_id         | integer   | not null
match_id        | integer   | not null
