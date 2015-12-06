import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toHomePage() {
      var matches = this.store.peekAll('match');
      var nextMatch = matches.find(function(match) {
        return match.get('isCurrent') === true;
      });

      if (nextMatch.get('hasStarted')) {
        this.transitionToRoute('matches.inprogress');
      } else {
        this.transitionToRoute('matches.current');
      }
    },

    toUserPage() {
      this.transitionToRoute('users');
    },

    toBetPage() {
      this.transitionToRoute('bets.show');
    }
  }
});
