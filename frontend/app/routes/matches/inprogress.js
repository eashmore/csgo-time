import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'matches',

  model() {
    return this.modelFor('application').match;
  },

  afterModel(model) {
    if (!model.get('hasStarted')) {
      this.transitionTo('matches.current');
    }
  },

  setupController(controller, model) {
    controller.set('model', model);
    controller.getPrizePool(model.get('bets'));
    controller.updateMatch(model);
  }
});
