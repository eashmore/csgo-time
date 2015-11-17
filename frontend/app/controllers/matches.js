import Ember from 'ember';

export default Ember.Controller.extend({
  timeLeft: "",

  itemGenerator(item, userId) {
    var newItem = this.store.createRecord('item', {
      name: item.get('name'),
      price: item.get('price'),
      gunType: item.get('gunType'),
      imageUrl: item.get('imageUrl'),
      condition: item.get('condition'),
      rarity: item.get('rarity'),
      isStattrack: item.get('isStattrack'),
      isSouvenir: item.get('isSouvenir'),
      userId: userId
    });

    newItem.save();

    return newItem;
  },

  getPayoutRatio(team, bets) {
    var betPool = 0;
    var winnerPool = 0;

    bets.forEach(function(bet) {
      var betValue = bet.get('totalValue');
      betPool += betValue;
      if (bet.get('teamId') == team.get('id')) {
        winnerPool += betValue;
      }
    }.bind(this));

    betPool = this.takeCut(betPool);

    var payout = betPool/winnerPool;
    return payout;
  },

  takeCut(pool) {
    var cut = pool * 0.15;
    pool -= cut;
    return pool;
  },

  getPayout(target, items) {
    target = (Math.round(target * 100)) / 100;
    if (target <= 0) {
      return [];
    }

    items = items.sort(function(a,b) {
      return b-a;
    });

    var payout = [];

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var price = item.get('price');

      if (price > target) {
        continue;
      }

      var remainder = target - price;
      var remainingItems = items.slice(i, items.length);

      var currentPayout = this.getPayout(remainder, remainingItems);
      if(!currentPayout) {
        continue;
      }

      payout = [items[i]].concat(currentPayout);
      return payout;

    }

    return payout;
  },

  payUser(payout, user) {
    for (var i = 0; i < payout.length; i++) {
      var userId = user.get('id');
      this.itemGenerator(payout[i], userId);
    }
  },

  updateTime() {
    var secToHours = function(sec) {
      var sec_num = parseInt(sec, 10);
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      var time = hours+' hour : '+minutes+' min : '+seconds+' sec';
      return time;
    };

    var model = this.get('model');
    var startTime = model.get('startTime');

    var timeLeft = new Date(startTime) - (new Date());
    timeLeft = timeLeft / 1000;
    timeLeft = secToHours(timeLeft);

    if (timeLeft <= 0) {
      this.startMatch();
    }

    this.set('timeLeft', timeLeft);

  },

  startMatch(match) {
    match.setProperties({'currentRound': 1, 'has_started': true});
    match.save();
  },

  actions: {
    payBets() {
      var match = this.get('model');
      var winTeam = match.get('winner');
      // var winners = winTeam.get('bets');
      var winners = [];
      var bets = match.get('bets');

      bets.forEach(function(bet) {
        if (bet.get('teamId') == winTeam.get('id')) {
          winners.push(bet);
        }
      });

      if (!bets) {
        return null;
      }

      this.store.findAll('itemdb').then(function(items) {
        items = items.toArray().sort(function(a, b) {
          return b.get('price') - a.get('price');
        });

        var payoutRatio = this.getPayoutRatio(winTeam, bets);
        for (var i = 0; i < winners.length; i++) {
          var bet = winners[i];
          var payoutValue = payoutRatio * bet.get('totalValue');
          var payout = this.getPayout(payoutValue, items);
          this.payUser(payout, bet.get('user'));
        }

      }.bind(this));
    },
  }
});
