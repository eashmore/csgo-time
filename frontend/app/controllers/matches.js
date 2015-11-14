import Ember from 'ember';

export default Ember.Controller.extend({
  getPayout(team, bets) {
    var betPool = 0;
    var winnerPool = 0;

    bets.forEach(function(bet) {
      let betValue = bet.get('totalValue');
      betPool += betValue;
      if (bet.get('team_id') === team.get('id')) {
        winnerPool += betValue;
      }
    });

    betPool = this.takeCut(betPool);

    let payout = betPool/winnerPool;
    return payout;
  },

  takeCut(pool) {
    let cut = pool * 0.15;
    pool -= cut;
    return pool;
  },

  makeChange(target, items) {
    if (items.length === 0) {
      return null;
    }

    items = items.sort(function(a, b) {
      return a - b;
    });

    for(var i = 0; i < items.length; i++) {
      let price = items[i].get('price');

      if (price > target) {
        continue;
      }

      let remainder = target - price;
      let remainingItems = items.slice(1);
      var bestRemainder = this.makeChange(remainder, remainingItems);

      if (bestRemainder === null) {
        continue;
      }

      var currentRemainder = [items[i]] + bestRemainder;

      if (!bestRemainder || (currentRemainder.length < bestRemainder.length)) {
        bestRemainder = currentRemainder;
      }
    }
  },

  actions: {
    payBets() {
      let match = this.get('model');
      let winTeam = match.get('winner');
      let bets = match.get('bets');

      let payout = this.getPayout(winTeam, bets);


    }
  }
});
