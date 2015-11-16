import Ember from 'ember';

export default Ember.Controller.extend({
  getPayout(team, bets) {
    var betPool = 0;
    var winnerPool = 0;

    bets.forEach(function(bet) {
      var betValue = bet.get('totalValue');
      betPool += betValue;
      if (bet.get('team_id') === team.get('id')) {
        winnerPool += betValue;
      }
    });

    betPool = this.takeCut(betPool);

    var payout = betPool/winnerPool;
    return payout;
  },

  takeCut(pool) {
    var cut = pool * 0.15;
    pool -= cut;
    return pool;
  },

  closestPayoutValue(target, items) {
    if (target <= 0) {
      return 0;
    }

    var bestDiff = null;

    for(var i = 0; i < items.length; i++) {
      var price = items[i].get('price');

      if (bestDiff === null) {
        bestDiff = price;
      }

      if (price > target) {
        if (Math.abs(target - (bestDiff + price)) < Math.abs(target - bestDiff)) {
          bestDiff += price;
          return bestDiff;
        }
        continue;
      }

      var remainder = target - price;
      var remainingItems = items.slice(i, items.length);
      var bestRemainder = this.makeChange(remainder, remainingItems);

      var currentRemainder = (price + bestRemainder);

      if (Math.abs(target - currentRemainder) < Math.abs(target - bestDiff)) {
        bestDiff = currentRemainder;
      }
    }

    return bestDiff;
  },

  bestPayout(target, items) {
    if (target === 0) {
      return [];
    }

    var currentRemainder = null;

    for(var i = 0; i < items.length; i++) {
      var price = items[i].get('price');

      if (price > target) {
        continue;
      }

      var remainder = target - price;
      var remainingItems = items.slice(i, items.length);
      var bestRemainder = this.makeChange(remainder, remainingItems);

      currentRemainder = [items[i]].concat(bestRemainder);
    }

    return currentRemainder;
  },

  payUser(payout, user) {
    payout.forEach(function(item) {
      item.set('user_id', user.get('id'));
      user.get('items').pushObject(item);
    });
  },

  actions: {
    payBets() {
      var match = this.get('model');
      var winTeam = match.get('winner');
      var bets = match.get('bet');
      var winners = winTeam.get('bet');

      var items = this.store.findAll('itemdb', { async: false });

      items = items.toArray().sort(function(a, b) {
        return b.get('price') - a.get('price');
      });

      var payoutRatio = this.getPayout(winTeam, bets);

      winners.forEach(function(bet) {
        var payoutValue = payoutRatio * bet.get('totalValue');
        var closestPayoutValue = this.closestPayoutValue(payoutValue, items);
        var payout = this.bestPayout(closestPayoutValue, items);
        this.payUser(payout, bet.get('user'));
      });
    }
  }
});
