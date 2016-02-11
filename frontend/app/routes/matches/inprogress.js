import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.queryRecord('match', { is_current: true });
  },

  afterModel(model) {
    if (!model.get('hasStarted')) {
      this.transitionTo('matches.current');
    }
  },

  setupController(controller, model) {
    controller.set('model', model);
    controller.updateMatch(model);
  }
});
