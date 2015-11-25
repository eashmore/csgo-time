# CS:GO Time

[Live link][link]

[link]: http://www.csgotime.co/


## Minimum Viable Product
This app will allow for the betting of items on the outcome of CS:GO matches. It will be built on Rails and Ember and allow users to:

- [X] Create accounts
- [X] Create sessions (log in)
- [X] View match details
- [X] Deposit and withdraw items onto account
- [X] Bet items on matches
- [X] Receive winnings from the betting pool through parimutuel betting

## To-Do
* Write integration tests
* Limit users to only one bet
* Handle tie games
* Display errors on failed bet
* Improve accuracy of payout algorithm
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
