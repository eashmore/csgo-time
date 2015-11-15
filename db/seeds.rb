User.create(username: 'username', password: 'password')

match = Match.create()

team1 = Team.create(name: "WOW_WE_LAGGED")
team2 = Team.create(name: "php_poets")

MatchLineup.create(match_id: match.id, team_id: team1.id)
MatchLineup.create(match_id: match.id, team_id: team2.id)

Itemdb.create(name: "Frontside Misty", price: 5.0, gun_type:"AK-47", image_url: "1",
            condition:"Field-Tested", rarity: "Classified", is_stattrack: true)

Itemdb.create(name: "Mudder", price: 1.23, gun_type:"Desert Eagle", image_url: "2",
            condition:"Well-Worm", rarity: "Industrial Grade")

Itemdb.create(name: "Forest DDPAT", price: 0.77, gun_type:"MP7", image_url: "3",
            condition:"Battle-Scarred", rarity: "Consumer Grade")

Itemdb.create(name: "Howl", price: 500.0, gun_type:"M4A4", image_url: "4",
            condition:"Factory New", rarity: "Contraband", is_stattrack: true)

Itemdb.create(name: "Origami", price: 4.0, gun_type:"Sawed-Off", image_url: "5",
            condition:"Minimal Wear", rarity: "Mil-Spec")

Itemdb.create(name: "Blue Steel", price: 9.51, gun_type:"Bayonet", image_url: "6",
            condition:"Field-Tested", rarity: "Covert", is_souvenir: true)
