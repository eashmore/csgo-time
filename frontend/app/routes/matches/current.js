import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('matches').get('lastObject');
  },

  afterModel() {
    // Need to fix. Can't GET users through nested association
    // `match.get('bets').get('user/team')`
    this.store.findAll('user');
    this.store.findAll('team');
  },

  setupController(controller, match) {
    controller.set('model', match);

    var currentBets = match.get('bets');
    if (currentBets.get('length')) {
      controller.prizePool(match);
    }

    if (match.get('hasStarted')) {
      this.transitionTo('matches.inprogress');
    }

    controller.timeUntilMatch(match);

    controller.getRecentBets(currentBets);
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
