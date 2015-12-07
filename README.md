# CS:GO Time

[Live link][link]

CS:GO Time is a site for the (simulated) betting of in-game items on Counter
Strike: Global Offensive matches through parimutual betting. A new match
everyday starting at 8:00pm.

Features:

* Payout algorithm implements a queue and hash maps to accurately and fairly
distribute items to winning users
* The site takes a 15% rake from the total prize pool using a recursive
algorithm to most closely represent this rake value given a pool of items
with varying prices
* Custom authentication using BCrypt which stores user’s password as a secret
hash

Technologies used to build this application include:

* Rails
* Ember.js
* jQuery
* Bootstrap

[link]: http://www.csgotime.co/


## Minimum Viable Product
This app will allow for the betting of items on the outcome of CS:GO matches.
It will be built on Rails and Ember and allow users to:

- [X] Create accounts
- [X] Create sessions (log in)
- [X] View match details
- [X] Deposit and withdraw items onto account
- [X] Bet items on matches
- [X] Receive winnings from the betting pool through parimutuel betting

## To-Do
* Write integration tests
* Handle tie games
* Display errors on failed bet
* Integrate Steam API
* Calculate odds for each team
* Display more information for ongoing match (ie. kill count, round time left)
* Move content into component to keep code organized and DRY
* Improve general UX
* Refactor everything!

## Design Docs
* [Payout Algorithm][payout]
* [Proposed DB schema][schema]
* [View Wireframes][views]

[payout]: ./docs/payout.md
[schema]: ./docs/schema.md
[views]: ./docs/views.md
