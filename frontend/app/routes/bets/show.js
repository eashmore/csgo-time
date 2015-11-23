import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var user = this.store.peekRecord('user', window.CURRENT_USER);
    return user.get('bets').get('lastObject');
  },

  afterModel() {
    // Need to fix. Can't GET items or team through nested association
    // `user.get('bets').get('items'/'team')`
    this.store.findAll('item');
    this.store.findAll('team');
  },

  setupController(controller, model) {
    controller.set('model', model);
    if (model) {
      var match = this.modelFor('matches').get('lastObject');
      controller.checkIsBetForCurrentMatch(match, model);
    }
  }
});
