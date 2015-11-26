import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var matches = this.modelFor('matches').sortBy('id');
    return matches.objectAt(matches.get('length') - 1);
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
