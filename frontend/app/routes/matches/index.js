import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('match');
  },

  currentMatch: "",

  afterModel(matches) {
    var currentMatch = matches.objectAt(0);
    this.set('currentMatch', currentMatch);

    this.timeUntilMatch(currentMatch);

    this.prizePool();
    Ember.addObserver(currentMatch, currentMatch.get('bets'), this, this.prizePool);
  },

  renderTemplate(controller) {
    this.render('matches.index', {
      model: this.currentMatch,
      controller: controller
    });

    var teamController = this.controllerFor('teams.index');
    this.render('teams.index', {
      into: 'matches.index',
      outlet: 'teams',
      controller: teamController,
      model: this.currentMatch.get('teams'),
    });
  },

  prizePool() {
    var pool = 0;

    var bets = this.currentMatch.get('bets');

    bets.forEach(function(bet) {
      pool += bet.get('totalValue');
    });

    this.currentMatch.set('prizePool', Math.round(pool));
  },

  timeUntilMatch(match) {
    var that = this;
    var controller = this.controllerFor('matches.index');
    var timer = setInterval(function() {
      var time = controller.updateTime(that.currentMatch);
      if (time <= 0) {
        if (time <= -14400001 && that.currentMatch.get('hasStarted')) {
          that.resetMatch();
        } else {
          clearInterval(timer);
          that.currentMatch.set('hasStarted', true);
          that.currentMatch.save();

          that.render('matches.inprogress', {
            into: 'matches',
            model: match
          });
        }
      }
    }.bind(controller), 1000);
  },

  resetMatch() {
    var startTime = function() {
      var start = new Date().setHours(20,0,0);
      return new Date(start);
    };

    this.currentMatch.setProperties({
      'hasStarted': false,
      'startTime': startTime(),
      'currentRound': 1,
      'winnerId': null
    });

    this.currentMatch.get('teams').forEach(function(team) {
      team.set('score', 0);
      team.save();
    });

    this.currentMatch.save();
  }
});
