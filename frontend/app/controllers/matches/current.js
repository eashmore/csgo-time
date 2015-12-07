import Ember from 'ember';

export default Ember.Controller.extend({
  recentBets: [],

  timeLeft: "",

  prizePool(match, bets) {
    var pool = 0;
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
    function getPayoutRatio(bets) {
      bets.forEach(function(bet) {
        var betValue = bet.get('totalValue');
        betPool += betValue;

        if (bet.get('teamId') === parseInt(winTeam.get('id'))) {
          winnerPool += betValue;
        }
      });

      betPool = getPoolAfterCut(betPool);

      var payout = (betPool/winnerPool);
      return payout;
    }

    function getWinningBets(bets) {
      var winningBets = [];
      bets.forEach(function(bet) {
        if (bet.get('teamId') === parseInt(winTeam.get('id'))) {
          winningBets.push(bet);
        }
      });

      return winningBets;
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

    function distributeItems(items) {
      var itemKeys = Object.keys(items);
      itemKeys = itemKeys.sort(function(a, b) {
        return b - a;
      });

      while(itemKeys.length) {
        var currentKey = itemKeys[itemKeys.length - 1];

        var max = null;
        for (var i = 0; i < winningBets.length; i++) {
          if (max === null || winningBets[i].get('payout') > max.get('payout')) {
            max = winningBets[i];
          }
        }

        payUser(items[currentKey], max);
        var newPayout = max.get('payout') - items[currentKey].get('price');
        max.set('payout', newPayout);

        if (max.get('payout') <= 0) {
          var idx = winningBets.indexOf(max);
          winningBets.splice(idx, 1);

          if (!winningBets.length) {
            break;
          }
        }

        itemKeys.pop();
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

    var that = this;
    var bets = match.get('bets');

    if (!bets.get('length') || match.get('hasEnded') === true) {
      return;
    }

    var items = match.get('items').sortBy('price');
    var itemsHash = hashifyItems(items, itemsHash);

    var winTeam = match.get('winner');
    var winningBets = getWinningBets(bets);

    var cutValue = 0;
    var cutItems = {};

    var betPool = 0;
    var winnerPool = 0;
    var payoutRatio = getPayoutRatio(bets);

    winningBets.forEach(function(bet) {
      var payout = bet.get('totalValue') * payoutRatio;
      bet.set('payout', payout);
    });

    distributeItems(itemsHash);

    match.set('hasEnded', true);
    match.save();
  }
});
