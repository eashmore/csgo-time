import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    // Need to fix. Can't GET users through nested association
    // `match.get('bets').get('user')`
    this.store.findAll('user');

    // Need to fix. Can't GET items or team through nested association
    // `user.get('bets').get('items'/'team')`
    this.store.findAll('item');
    this.store.findAll('team');
  },

  model() {
    return this.store.findRecord('user', window.CURRENT_USER);
  }
});
