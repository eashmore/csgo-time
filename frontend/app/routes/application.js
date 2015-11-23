import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    // Need to fix. Can't GET users through nested association
    // `match.get('bets').get('user')`

    this.store.findAll('user');
  },

  model() {
    return this.store.findRecord('user', window.CURRENT_USER);
  }
});
