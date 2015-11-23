import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('matches').get('lastObject');
  },

  afterModel(match) {
    var controller = this.controllerFor('matches.current');

    if (match.get('hasStarted')) {
      controller.renderInprogress();
    } else {
      this.timeUntilMatch(match, controller);

      var currentBets = match.get('bets');
      if (currentBets.get('length')) {
        this.prizePool(match);
      }

      this.getRecentBets(currentBets);
    }
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

  timeUntilMatch(match, controller) {
    controller.updateTime(match);
    setInterval(function() {
      controller.updateTime(match);

      // if (match.get('hasStarted')) {
      //   clearInterval(timer);
      //   renderInprogress();
      // }
    }, 1000);
  }
});
