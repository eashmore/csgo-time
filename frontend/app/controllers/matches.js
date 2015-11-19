import Ember from 'ember';

export default Ember.Controller.extend({
  timeLeft: "",

  getPayoutRatio(team, bets, items) {
    var betPool = 0;
    var winnerPool = 0;

    bets.forEach(function(bet) {

      var betValue = bet.get('totalValue');
      betPool += betValue;
      if (bet.get('teamId') == team.get('id')) {
        winnerPool += betValue;
      }
    }.bind(this));

    betPool = this.takeCut(betPool, items);

    var payout = betPool/winnerPool;
    return payout;
  },

  takeCut(poolValue, items) {
    var cutValue = poolValue * 0.15;

    var cut = this.getPayout(cutValue, items);

    cut.forEach(function(item) {
      item.destroyRecord();
    });

    var pool = 0;
    items.forEach(function(item) {
      pool += item.get('price');
    });

    return pool;
  },

  getPayout(target, items) {

    target = (Math.round(target * 100)) / 100;
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

      var currentPayout = this.getPayout(remainder, remainingItems);
      if(!currentPayout) {
        continue;
      }

      payout = [items[i]].concat(currentPayout);
      return payout;

    }

    return payout;
  },

  payUser(payout, user, match) {
    var userId = user.get('id');

    payout.forEach(function(item) {
      item.set('userId', userId);
      item.save();
      user.get('items').pushObject(item);
      match.get('items').removeObject(item);
    });
  },

  updateTime(match) {
    var secToHours = function(sec) {
      var sec_num = parseInt(sec, 10);
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours < 10) {hours = "0" + hours;}
      if (minutes < 10) {minutes = "0" + minutes;}
      if (seconds < 10) {seconds = "0" + seconds;}
      var time = hours + ' hours : ' + minutes + ' mins : ' + seconds + ' secs';
      return time;
    };

    var startTime = match.get('startTime');

    var timeLeft = new Date(startTime) - (new Date());
    timeLeft = timeLeft / 1000;

    // for testing
    timeLeft = 0;
    // timeLeft = -14400001;
    // timeLeft = 100;

    var timeLeftString = timeLeft < 0 ? secToHours(0) : secToHours(timeLeft);

    this.set('timeLeft', timeLeftString);

    return timeLeft;
  },

  removeBets(bets) {
    bets.forEach(function(bet) {
      bet.set('matchId', 0);
      bet.save();
    });
  },

  payBets() {
    var match = this.get('model');
    // var teams = match.get('teams');
    var items = match.get('items');

    var winTeam = match.get('winner');
    // teams.forEach(function(team) {
    //   if (team.get('id') == match.get('winnerId')) {
    //     winTeam = team;
    //   }
    // });
    // var winners = winTeam.get('bets');
    var winners = [];
    var bets = match.get('bets');
    //
    bets.forEach(function(bet) {
      if (bet.get('teamId') == winTeam.get('id')) {
        winners.push(bet);
      }
    });

    if (!bets) {
      return null;
    }

    items = items.sortBy('price').toArray();
    var payoutRatio = this.getPayoutRatio(winTeam, bets, items);
    for (var i = 0; i < winners.length; i++) {
      var bet = winners[i];
      var payoutValue = payoutRatio * bet.get('totalValue');

      var payout = this.getPayout(payoutValue, items);

      this.payUser(payout, bet.get('user'), match);
    }

    this.removeBets(bets);
  },
});
