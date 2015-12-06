import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.queryRecord('match', { is_current: true });
  },

  setupController(controller, match) {
    controller.set('model', match);

    Ember.Logger.log(match);

    var bets = match.get('bets');
    if (bets.get('length')) {
      controller.prizePool(match, bets);
      controller.getRecentBets(bets);
    }

    if (match.get('hasStarted')) {
      this.transitionTo('matches.inprogress');
    }

    controller.timeUntilMatch(match);
  },

  renderTemplate(controller, model) {
    var that = this;

    this.render('matches.current', {
      model: model
    });

    var teamController = this.controllerFor('teams.index');

    that.render('teams.index', {
      into: 'matches.current',
      outlet: 'teams',
      controller: teamController,
      model: model.get('teams'),
    });

    this.store.query('team', { matchId: model.get('id') });
  }
});
