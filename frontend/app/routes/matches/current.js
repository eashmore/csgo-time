import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('matches').get('lastObject');
  },

  setupController(controller, match) {
    controller.set('model', match);

    if (match.get('hasStarted')) {
      controller.transitionToInprogress();
    } else {
      controller.timeUntilMatch(match);

      var currentBets = match.get('bets');
      if (currentBets.get('length')) {
        controller.prizePool(match);
      }

      controller.getRecentBets(currentBets);
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
  }
});
