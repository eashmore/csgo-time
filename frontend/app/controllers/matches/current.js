import Ember from 'ember';

export default Ember.Controller.extend({
  recentBets: [],

  timeLeft: "",

  prizePool(match) {
    var pool = 0;
    var bets = match.get('bets');
    bets.forEach(function(bet) {
      pool += bet.get('totalValue');
    });

    match.set('prizePool', Math.round(pool));
    match.save();
  },

  getRecentBets(bets) {
    var recentBets = [];

    var mostRecentBet = bets.get('lastObject');
    var mostRecentBetId = parseInt(mostRecentBet.get('id'));

    for (var i = mostRecentBetId; i > mostRecentBetId - 6; i--) {
      var bet = this.store.peekRecord('bet', i);
      if (bet){
        recentBets.push(bet);
      } else {
        break;
      }
    }

    this.set('recentBets', recentBets);
  },

  //timer setup
  timeUntilMatch(match) {
    function updateTime() {
      var startTime = match.get('startTime');

      var timeLeft = new Date(startTime) - (new Date());
      timeLeft = timeLeft / 1000;

      var timeLeftString = timeLeft < 0 ? secToHours(0) : secToHours(timeLeft);
      that.set('timeLeft', timeLeftString);

      return timeLeft;
    }

    function secToHours(sec) {
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
    }

    var that = this;

    updateTime();
    setInterval(function() {
      updateTime();
      // if (match.get('hasStarted')) {
      //   clearInterval(timer);
      //   renderInprogress();
      // }
    }, 1000);
  },

  // payout and rake
  takeRake(target, items) {
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

      var currentPayout = this.takeRake(remainder, remainingItems);
      if (!currentPayout) {
        continue;
      }

      payout = [items[i]].concat(currentPayout);
      return payout;

    }

    return payout;
  },

  payBets(match) {
    function getPayoutRatio() {
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

      betPool = getPoolAfterCut(betPool);

      var payout = (betPool/winnerPool);
      return payout;
    }

    function getPoolAfterCut(betValue) {
      cutValue = betValue * 0.2;

      cutItems = that.takeRake(cutValue, sortedItems);

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
    }

    function distributeItems(itemsList) {
      var betQueue = winBets;

      while(itemsList.length) {
        var itemPrice = itemsList[0].get('price');

        if (itemPrice > largestPayout) {
          var handledItem = itemsList.shift();
          expensiveItems.push(handledItem);
          continue;
        }

        for(var i = 0; i < betQueue.length; i++) {
          var userCurrentPayout = betQueue[i].get('payout');

          if (itemPrice <= userCurrentPayout) {
            payUser(itemsList[0], betQueue[i]);

            var newPayout = userCurrentPayout - itemPrice;
            betQueue[i].set('payout', newPayout);

            if (userCurrentPayout > betQueue[i].get('payout')) {
              largestPayout = betQueue[i].get('payout');
            }

            var handledBets = betQueue.shift();
            betQueue.push(handledBets);

            itemsList.shift();
            break;
          }
        }
      }

      if (expensiveItems.length) {
        var totalValueRemaining = 0;
        expensiveItems.forEach(function(item) {
          totalValueRemaining += item.get('price');
        });

        if(totalValueRemaining > cutValue) {
          cutValue = totalValueRemaining;
          distributeItems(cutItems);
          cutItems = expensiveItems;
        }
      }
    }

    function payUser(item, bet) {
      var user = bet.get('user');
      var userId = user.get('id');

      user.get('items').pushObject(item);
      match.get('items').removeObject(item);

      item.setProperties({ 'userId': userId, 'betId': null });
      item.save();
    }

    var that = this;
    var bets = match.get('bets');

    if (match.get('hasEnded') || !bets.get('length')) {
      return;
    }

    var items = match.get('items');
    var sortedItems = items.sortBy('price').toArray().reverse();

    var winTeam = match.get('winner');
    var winBets = [];

    var cutValue = 0;
    var cutItems = [];

    var payoutRatio = getPayoutRatio();

    winBets.forEach(function(bet) {
      var payout = bet.get('totalValue') * payoutRatio;
      bet.set('payout', payout);
    });

    winBets = winBets.sort(function(a, b) {
      return b.get('payout') - a.get('payout');
    });

    var largestPayout = winBets[0].get('payout');
    var expensiveItems = [];

    distributeItems(sortedItems);

    match.set('hasEnded', true);
    match.save();
  }
});
