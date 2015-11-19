User.create(username: 'Guest', password: 'password')

match = Match.create(map: "de_dust2", current_round: 1, has_started: false)


team1 = Team.create(name: "WOW_WE_LAGGED",
  avatar_url: "http://res.cloudinary.com/dqucbuno8/image/upload/h_250,w_250/v1447814571/lag-kills-people_nrbbgr.png"
)
team2 = Team.create(name: "php_poets",
  avatar_url: "http://res.cloudinary.com/dqucbuno8/image/upload/c_fill,h_250,w_250/v1447827745/dedicated-php-developer_zfcdls.png"
)
MatchLineup.create(match_id: match.id, team_id: team1.id)
MatchLineup.create(match_id: match.id, team_id: team2.id)

Itemdb.create(name: "Frontside Misty", price: 5.0, gun_type:"AK-47",
  image_url: "http://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png",
  condition:"Field-Tested", rarity: "Classified", is_stattrack: true
)

Itemdb.create(name: "Mudder", price: 1.23, gun_type:"Desert Eagle",
  image_url: "http://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png",
  condition:"Well-Worm", rarity: "Industrial Grade"
)

Itemdb.create(name: "Forest DDPAT", price: 0.77, gun_type:"MP7",
  image_url: "http://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png",
  condition:"Battle-Scarred", rarity: "Consumer Grade"
)

Itemdb.create(name: "Howl", price: 500.0, gun_type:"M4A4",
  image_url: "http://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/howl_uhr4yy.png",
  condition:"Factory New", rarity: "Contraband", is_stattrack: true
)

Itemdb.create(name: "Origami", price: 4.0, gun_type:"Sawed-Off",
  image_url: "http://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png",
  condition:"Minimal Wear", rarity: "Mil-Spec"
)

Itemdb.create(name: "Blue Steel", price: 9.51, gun_type:"Bayonet",
  image_url: "http://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png",
  condition:"Field-Tested", rarity: "Covert", is_souvenir: true
)
