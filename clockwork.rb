require 'rubygems'
require 'clockwork'
require './config/boot'
require './config/environment'
include Clockwork


module Clockwork
  handler do |job|
    puts "Running #{job}"
  end

  every(1.day, 'start_match', :at => '04:00', :tz => 'UTC') do
    match = Match.all.last
    match.simulate_match
  end

  every(1.day, 'fill_db', :at => '08:00', :tz => 'UTC') do
    new_match = Match.create(
      { has_started: false, map: 'de_dust2', current_round: 0 }
    )
    new_match.save

    Team.all.each do |team|
      team.rounds_won = 0
      team.save
    end

    match_lineups = MatchLineup.create([
      {match_id: new_match.id, team_id: 1},
      {match_id: new_match.id, team_id: 2}
    ])

    match_lineups.each do |lineup|
      lineup.save
    end

    bet_array = Bet.create([
      {user_id: 1, match_id: new_match.id, team_id: 1, total_value: 66.6},
      {user_id: 2, match_id: new_match.id, team_id: 1, total_value: 24.46},
      {user_id: 3, match_id: new_match.id, team_id: 1, total_value: 537.3},
      {user_id: 4, match_id: new_match.id, team_id: 2, total_value: 40.48},
      {user_id: 5, match_id: new_match.id, team_id: 2, total_value: 41.02},
      {user_id: 6, match_id: new_match.id, team_id: 2, total_value: 533.25},
      {user_id: 7, match_id: new_match.id, team_id: 1, total_value: 40.56},
      {user_id: 8, match_id: new_match.id, team_id: 2, total_value: 28.05},
      {user_id: 9, match_id: new_match.id, team_id: 1, total_value: 86.82},
      {user_id: 10, match_id: new_match.id, team_id: 1, total_value: 46.23}
    ])

    bet_array.each do |bet|
      bet.save
    end

    item_array = Item.create([
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[0].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[0].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[0].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[0].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[0].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[0].id},
      {name: "Origami", price: 4.0, gun_type: "Sawed-Off", condition: "Minimal Wear", rarity: "Mil-Spec", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png", user_id: nil, bet_id: bet_array[0].id},
      {name: "Origami", price: 4.0, gun_type: "Sawed-Off", condition: "Minimal Wear", rarity: "Mil-Spec", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png", user_id: nil, bet_id: bet_array[0].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[0].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[0].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[1].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[1].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[1].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[1].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[1].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[1].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[1].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[1].id},
      {name: "Origami", price: 4.0, gun_type: "Sawed-Off", condition: "Minimal Wear", rarity: "Mil-Spec", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png", user_id: nil, bet_id: bet_array[1].id},
      {name: "Origami", price: 4.0, gun_type: "Sawed-Off", condition: "Minimal Wear", rarity: "Mil-Spec", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png", user_id: nil, bet_id: bet_array[1].id},
      {name: "Howl", price: 500.0, gun_type: "M4A4", condition: "Factory New", rarity: "Contraband", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/howl_uhr4yy.png", user_id: nil, bet_id: bet_array[2].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[2].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[2].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[2].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[2].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[2].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[2].id},
      {name: "Origami", price: 4.0, gun_type: "Sawed-Off", condition: "Minimal Wear", rarity: "Mil-Spec", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png", user_id: nil, bet_id: bet_array[2].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[2].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[2].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[3].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[3].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[3].id},
      {name: "Origami", price: 4.0, gun_type: "Sawed-Off", condition: "Minimal Wear", rarity: "Mil-Spec", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png", user_id: nil, bet_id: bet_array[3].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[3].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[3].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[3].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[3].id},
      {name: "Origami", price: 4.0, gun_type: "Sawed-Off", condition: "Minimal Wear", rarity: "Mil-Spec", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png", user_id: nil, bet_id: bet_array[3].id},
      {name: "Origami", price: 4.0, gun_type: "Sawed-Off", condition: "Minimal Wear", rarity: "Mil-Spec", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png", user_id: nil, bet_id: bet_array[3].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[4].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[4].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[4].id},
      {name: "Origami", price: 4.0, gun_type: "Sawed-Off", condition: "Minimal Wear", rarity: "Mil-Spec", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png", user_id: nil, bet_id: bet_array[4].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[4].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[4].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[4].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[4].id},
      {name: "Origami", price: 4.0, gun_type: "Sawed-Off", condition: "Minimal Wear", rarity: "Mil-Spec", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png", user_id: nil, bet_id: bet_array[4].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[4].id},
      {name: "Howl", price: 500.0, gun_type: "M4A4", condition: "Factory New", rarity: "Contraband", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/howl_uhr4yy.png", user_id: nil, bet_id: bet_array[5].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[5].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[5].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[5].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[5].id},
      {name: "Origami", price: 4.0, gun_type: "Sawed-Off", condition: "Minimal Wear", rarity: "Mil-Spec", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png", user_id: nil, bet_id: bet_array[5].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[5].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[5].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[5].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[5].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[6].id},
      {name: "Origami", price: 4.0, gun_type: "Sawed-Off", condition: "Minimal Wear", rarity: "Mil-Spec", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png", user_id: nil, bet_id: bet_array[6].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[6].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[6].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[6].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[6].id},
      {name: "Origami", price: 4.0, gun_type: "Sawed-Off", condition: "Minimal Wear", rarity: "Mil-Spec", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png", user_id: nil, bet_id: bet_array[6].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[6].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[6].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[6].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[7].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[7].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[7].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[7].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[7].id},
      {name: "Origami", price: 4.0, gun_type: "Sawed-Off", condition: "Minimal Wear", rarity: "Mil-Spec", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png", user_id: nil, bet_id: bet_array[7].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[7].id},
      {name: "Origami", price: 4.0, gun_type: "Sawed-Off", condition: "Minimal Wear", rarity: "Mil-Spec", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/origami_xopke7.png", user_id: nil, bet_id: bet_array[7].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[7].id},
      {name: "Forest DDPAT", price: 0.77, gun_type: "MP7", condition: "Battle-Scarred", rarity: "Consumer Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814186/ddpat_suubqw.png", user_id: nil, bet_id: bet_array[7].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[8].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[8].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[8].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[8].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[8].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[8].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[8].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[8].id},
      {name: "Blue Steel", price: 9.51, gun_type: "Bayonet", condition: "Field-Tested", rarity: "Covert", is_stattrack: false, is_souvenir: true, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/bluesteel_er3oeo.png", user_id: nil, bet_id: bet_array[8].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[8].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[9].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[9].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[9].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[9].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[9].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[9].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[9].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[9].id},
      {name: "Frontside Misty", price: 5.0, gun_type: "AK-47", condition: "Field-Tested", rarity: "Classified", is_stattrack: true, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/frontsidemisty_xfeh8a.png", user_id: nil, bet_id: bet_array[9].id},
      {name: "Mudder", price: 1.23, gun_type: "Desert Eagle", condition: "Well-Worm", rarity: "Industrial Grade", is_stattrack: false, is_souvenir: false, image_url: "https://res.cloudinary.com/dqucbuno8/image/upload/v1447814183/mudder_weljxg.png", user_id: nil, bet_id: bet_array[9].id}
    ])

    item_array.each do |item|
      item.save
    end
  end

end
