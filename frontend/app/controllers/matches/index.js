import Ember from 'ember';

export default Ember.Controller.extend({
  timeLeft: "",

  updateTime(match) {
    var secToHours = function(sec) {
      var sec_num = parseInt(sec, 10);
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      var time = hours + ' hours : ' + minutes + ' mins : ' + seconds + ' secs';
      return time;
    };

    var startTime = match.get('startTime');

    var timeLeft = new Date(startTime) - (new Date());
    timeLeft = timeLeft / 1000;

    // for testing
    timeLeft = 0;
    // timeLeft = -14400011;
    // timeLeft = 100;

    var timeLeftString = timeLeft < 0 ? secToHours(0) : secToHours(timeLeft);
    this.set('timeLeft', timeLeftString);

    return timeLeft;
  },

  getRake(target, items) {
    target = (Math.round(target * 100)) / 100;

    if (items.length < 1) {
      return null;
    }

    if (target <= 0) {
      return [];
    }

    var payout = [];

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var price = item.get('price');

      if (price > target) {
        continue;
      }

      var remainder = target - price;
      var remainingItems = items.slice(i + 1, items.length);

      var currentPayout = this.getRake(remainder, remainingItems);
      if (!currentPayout) {
        continue;
      }

      payout = [items[i]].concat(currentPayout);
      return payout;

    }

    return payout;
  },

  payBets() {
    var that = this;
    var match = this.get('model');
    var bets = match.get('bets');
    var currentUser = this.store.peekRecord('user', window.CURRENT_USER);
    var allBets = this.store.peekAll('bet');

    if (!bets) {
      return null;
    }

    var items = match.get('items');
    var sortedItems = items.sortBy('price').toArray().reverse();

    var winTeam = match.get('winner');
    var winBets = [];

    var getPayoutRatio = function() {
      var betPool = 0;
      var winnerPool = 0;

      bets.forEach(function(bet) {
        var betValue = bet.get('totalValue');
        betPool += betValue;
        if (bet.get('teamId') === parseInt(winTeam.get('id'))) {
          winnerPool += betValue;
          winBets.push(bet);
        }
      });

      betPool = takeCut(betPool);

      var payout = (betPool/winnerPool);
      return payout;
    };

    var cutValue = 0;
    var cutItems = [];

    var takeCut = function(betValue) {
      cutValue = betValue * 0.2;

      cutItems = that.getRake(cutValue, sortedItems);

      cutItems.forEach(function(item) {
        item.set('betId', 0);
        item.save();
        items.removeObject(item);
      });

      var pool = 0;
      items.forEach(function(item) {
        pool += item.get('price');
      });

      return pool;
    };

    var payUser = function(item, bet) {
      var user = bet.get('user');
      var userId = user.get('id');

      user.get('items').pushObject(item);
      match.get('items').removeObject(item);

      item.setProperties({ 'userId': userId, 'betId': null });
      item.save();
    };

    var sortItems = function(itemsList) {
      while(itemsList.length) {
        var itemPrice = itemsList[0].get('price');

        if (itemPrice > largestPayout) {
          var handledItem = itemsList.shift();
          expensiveItems.push(handledItem);
          continue;
        }

        for(var i = 0; i < winBets.length; i++) {
          var userCurrentPayout = winBets[i].get('payout');

          if (itemPrice <= userCurrentPayout) {
            payUser(itemsList[0], winBets[i]);

            var newPayout = userCurrentPayout - itemPrice;
            winBets[i].set('payout', newPayout);

            if (userCurrentPayout > winBets[i].get('payout')) {
              largestPayout = winBets[i].get('payout');
            }

            var handledBet = winBets.shift();
            winBets.push(handledBet);

            itemsList.shift();
            break;
          }
        }
      }

      if (expensiveItems.length && expensiveItems[0].get('price') > cutValue) {
        cutValue = expensiveItems[0].get('price');
        sortItems(cutItems);
        cutItems = expensiveItems;
      }
    };

    var removeBets = function() {
      allBets.forEach(function(bet) {
        if (bet) {
          bet.setProperties({ 'matchId': 0, 'userId': 0 });
          bet.save();
          match.get('bets').removeObject(bet);
        }
      });

      currentUser.get('bets').clear();
    };

    var payoutRatio = getPayoutRatio();

    sortedItems = items.sortBy('price').toArray().reverse();

    winBets.forEach(function(bet) {
      var payout = bet.get('totalValue') * payoutRatio;
      bet.set('payout', payout);
    });

    winBets = winBets.sort(function(a, b) {
      return b.get('payout') - a.get('payout');
    });

    var largestPayout = winBets[0].get('payout');
    var expensiveItems = [];

    sortItems(sortedItems);

    removeBets();
  }
});
