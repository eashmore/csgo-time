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
      this.store.findRecord('user', bet.get('userId'));

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
    var timer = setInterval(function() {
      var timeLeft = updateTime();
      if (timeLeft <= 0) {
        match.reload();
      }

      if (match.get('hasStarted')) {
        clearInterval(timer);
        that.transitionToRoute('matches.inprogress');
      }
    }, 1000);
  },

  // payout and rake
  payBets(match) {
    function getPayoutRatioAndWinningBets(bets) {
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

    function takeRake(target, itemKeys) {
      target = (Math.round(target * 100)) / 100;

      if (items.length < 1) {
        return null;
      }

      if (target <= 0) {
        return [];
      }

      var payout = [];

      for (var i = 0; i < itemKeys.length; i++) {
        var item = itemsHash[i];
        var price = item.get('price');

        if (price > target) {
          continue;
        }

        var remainder = target - price;
        var remainingItems = itemKeys.slice(i + 1, itemKeys.length);

        var currentPayout = takeRake(remainder, remainingItems);
        if (!currentPayout) {
          continue;
        }

        payout = [itemKeys[i]].concat(currentPayout);
        return payout;
      }

      return payout;
    }

    function getPoolAfterCut(betValue) {
      cutValue = betValue * 0.2;

      var cutKeys = takeRake(cutValue, Object.keys(itemsHash));

      cutKeys.forEach(function(key) {
        cutItems[key] = itemsHash[key];
        delete itemsHash[key];
      });

      var pool = 0;
      Object.keys(itemsHash).forEach(function(key) {
        pool += itemsHash[key].get('price');
      });

      return pool;
    }

    function distributeItems(items, itemKeys) {
      var betQueue = winBets;

      while(itemKeys.length) {
        var firstKey = itemKeys[0];
        var itemPrice = items[firstKey].get('price');

        if (itemPrice > largestPayout) {
          var handledItem = itemKeys.shift();
          expensiveItems[handledItem] = items[handledItem];
          delete items[handledItem];
          continue;
        }

        for(var i = 0; i < betQueue.length; i++) {
          var userCurrentPayout = betQueue[i].get('payout');

          if (itemPrice <= userCurrentPayout) {
            payUser(items[firstKey], betQueue[i]);

            var newPayout = userCurrentPayout - itemPrice;
            betQueue[i].set('payout', newPayout);

            if (userCurrentPayout > betQueue[i].get('payout')) {
              largestPayout = betQueue[i].get('payout');
            }

            var handledBets = betQueue.shift();
            betQueue.push(handledBets);

            itemKeys.shift();
            break;
          }
        }
      }

      var expensiveKeys = Object.keys(expensiveItems);
      if (expensiveKeys.length) {
        var totalValueRemaining = 0;
        expensiveKeys.forEach(function(key) {
          totalValueRemaining += expensiveItems[key].get('price');
        });

        if(totalValueRemaining > cutValue) {
          cutValue = totalValueRemaining;
          var cutItemKeys = Object.keys(cutItems);
          distributeItems(cutItems, cutItemKeys);
          cutItems = expensiveItems;
        }
      }
    }

    function payUser(item, bet) {
      var userId = bet.get('userId');
      that.store.findRecord('user', userId).then(function(user) {
        user.get('items').pushObject(item);
        match.get('items').removeObject(item);

        item.set('userId', userId);
        item.save();
      });
    }

    function hashifyItems(items) {
      var itemsHash = {};
      var itemIdx = items.get('length');

      items.forEach(function(item) {
        itemIdx -= 1;
        itemsHash[itemIdx] = item;
      });

      return itemsHash;
    }

    function sortBetsByPayout(winBets) {
      winBets.forEach(function(bet) {
        var payout = bet.get('totalValue') * payoutRatio;
        bet.set('payout', payout);
      });

      winBets = winBets.sort(function(a, b) {
        return b.get('payout') - a.get('payout');
      });
    }

    var that = this;
    var bets = match.get('bets');
    if (!bets.get('length')) {
      return;
    }

    var items = match.get('items').sortBy('price');
    var itemsHash = hashifyItems(items, itemsHash);

    var winTeam = match.get('winner');
    var winBets = [];

    var cutValue = 0;
    var cutItems = {};

    var payoutRatio = getPayoutRatioAndWinningBets(bets);

    sortBetsByPayout(winBets);

    var largestPayout = winBets[0].get('payout');
    var expensiveItems = {};

    var itemKeys = Object.keys(itemsHash);
    distributeItems(itemsHash, itemKeys);
  }
});
