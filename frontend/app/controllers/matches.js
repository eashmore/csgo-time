import Ember from 'ember';

export default Ember.Controller.extend({
  recentBets: [],

  timeLeft: '',

  prizePool: 0,

  getPrizePool(bets) {
    var pool = 0;
    bets.forEach(function(bet) {
      pool += bet.get('totalValue');
    });
    debugger;
    this.set('prizePool', Math.round(pool));
  },

  getRecentBets(bets) {
    var recentBets = bets.slice(0, 6);
    for(var i = 0; i < recentBets.length; i++) {
      this.store.findRecord('user', recentBets[i].get('userId'));
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

  updateMatch(match){
    var checkMatch = setInterval(function() {
      match.reload();
      if (match.get('winnerId')) {
        clearInterval(checkMatch);
      }
    }, 1000);
  }
});
