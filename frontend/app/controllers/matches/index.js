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
    // timeLeft = 0;
    // timeLeft = -14400011;
    // timeLeft = 100;

    var timeLeftString = timeLeft < 0 ? secToHours(0) : secToHours(timeLeft);

    this.set('timeLeft', timeLeftString);

    return timeLeft;
  },

  getPayout(target, items) {
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

      var currentPayout = this.getPayout(remainder, remainingItems);
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
    // var sortedItems = items.toArray();

    var winTeam = match.get('winner');
    var winners = [];

    function getPayoutRatio() {
      var betPool = 0;
      var winnerPool = 0;

      bets.forEach(function(bet) {
        var betValue = bet.get('totalValue');
        betPool += betValue;
        if (bet.get('teamId') === parseInt(winTeam.get('id'))) {
          winnerPool += betValue;
          winners.push(bet);
        }
      });

      betPool = takeCut(betPool);

      var payout = (betPool/winnerPool);
      return payout;
    }

    function takeCut(betValue) {
      var cutValue = betValue * 0.15;

      var cut = that.getPayout(cutValue, sortedItems);

      cut.forEach(function(item) {
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

    function payUser(payout, user) {

      var userId = user.get('id');

      payout.forEach(function(item) {
        item.set('userId', userId);
        items.removeObject(item);

        user.get('items').pushObject(item);
        match.get('items').removeObject(item);
        item.save();
      });
    }

    function removeBets () {
      allBets.forEach(function(bet) {
        if (bet) {
          bet.setProperties({ 'matchId': 0, 'userId': 0 });
          bet.save();
          match.get('bets').removeObject(bet);
        }
      });

      currentUser.get('bets').clear();
    }

    var payoutRatio = getPayoutRatio();

    for (var i = 0; i < winners.length; i++) {
      var bet = winners[i];
      var payoutValue = payoutRatio * bet.get('totalValue');

      sortedItems = items.sortBy('price').toArray().reverse();
      var payout = that.getPayout(payoutValue, sortedItems);

      if (bet.get('user')) {
        payUser(payout, bet.get('user'));
      } else {
        var betUser = that.store.peekRecord('user', bet.get('userId'));
        payUser(payout, betUser);
      }
    }
    removeBets();
  }
});