import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('match').get('bets');
  },

  afterModel(model) {
    this.recentBets(model);
  },

  mostRecentBets: [],

  resentBets(bets) {
    for (var i = bets.get('length') - 1; i < bets.get('length') - 10; i--) {
      if (i < 0) {
        break;
      }
      
      this.mostRecentBets.push(bets.objectAt(i));
    }
  }
});
