import Ember from 'ember';

export default Ember.Controller.extend({
  isCurrentMatch: false,

  checkCurrentMatch (match, bet) {
    if (parseInt(match.get('id')) === bet.get('matchId')) {
      this.set('isCurrentMatch', true);
    } else {
      this.set('isCurrentMatch', false);
    }
  },

  actions: {
    toMatchPage() {
      this.transitionToRoute('matches.current');
    }
  }
});
