import Ember from 'ember';

export default Ember.Controller.extend({
  isBetForCurrentMatch: false,

  checkIsBetForCurrentMatch (match, bet) {
    if (parseInt(match.get('id')) === bet.get('matchId')) {
      this.set('isBetForCurrentMatch', true);
    } else {
      this.set('isBetForCurrentMatch', false);
    }
  },

  actions: {
    toMatchPage() {
      this.transitionToRoute('matches.current');
    }
  }
});
