# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create(username: 'username', password: 'password')

time = Time.now.to_f * 1000
time2 = time + 86400000
match = Match.create(start_time: time)
match2 = Match.create(start_time: time2)

team1 = Team.create(name: "WOW_WE_LAGGED")
team2 = Team.create(name: "php_poets")

MatchLineup.create(match_id: match.id, team_id: team1.id)
MatchLineup.create(match_id: match.id, team_id: team2.id)

MatchLineup.create(match_id: match2.id, team_id: team1.id)
MatchLineup.create(match_id: match2.id, team_id: team2.id)
