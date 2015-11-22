import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.modelFor('matches').get('firstObject');
  },

  afterModel(match) {
    this.timeUntilMatch(match);

    var currentBets = match.get('bets');

    if (currentBets.get('length')) {
      this.prizePool(match);
    }

    this.getRecentBets(currentBets);
  },

  renderTemplate(c, model) {
    this.render('matches.current', {
      model: model
    });

    var teamController = this.controllerFor('teams.index');
    this.render('teams.index', {
      into: 'matches.current',
      outlet: 'teams',
      controller: teamController,
      model: model.get('teams'),
    });
  },

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
    var controller = this.controllerFor('matches.current');
    var recentBets = [];

    bets = bets.toArray().reverse();

    for (var i = 0; i < 6; i++) {
      if (i >= bets.length) {
        break;
      }

      recentBets.push(bets[i]);
    }

    controller.set('recentBets', recentBets);
  },

  timeUntilMatch(match) {
    var that = this;
    var controller = this.controllerFor('matches.current');

    var timer = setInterval(function() {
      var time = controller.updateTime(match);
      if (time <= 0) {
        if (time <= -14400001 && match.get('hasStarted')) {
          clearInterval(timer);
          that.resetMatch(match);
        } else {
          clearInterval(timer);
          match.set('hasStarted', true);
          match.save();

          that.render('matches.inprogress', {
            into: 'matches',
            model: match
          });
        }
      }
    }.bind(controller), 1000);
  },

  resetMatch(match) {
    function startTime() {
      var start = new Date().setHours(20,0,0);
      return new Date(start);
    }

    function resetScores(teams) {
      teams.forEach(function(team) {
        team.set('score', 0);
        team.save();
      });
    }

    function resetBets(bets) {
      bets.forEach(function(bet) {
        bet.set('userId', 0);
        bet.save();
      });

      var currentUser = this.store.peekRecord('user', window.CURRENT_USER);
      currentUser.get('bets').clear();
    }

    function reseedBet(bet) {
      bet.setProperties({ 'matchId': 1, 'userId': userId });
      bet.save();
    }

    match.setProperties({
      'hasStarted': false,
      'startTime': startTime(),
      'currentRound': 1,
      'winnerId': null
    });

    match.get('teams').forEach(function(team) {
      team.set('score', 0);
      team.save();
    });

    match.save();

    resetScores(match.get('teams'));
    resetBets(match.get('bets'));

    var userId = 1;
    while (userId <= 10) {
      this.store.findRecord('bet', userId).then(reseedBet);
      userId++;
    }
  }
});
