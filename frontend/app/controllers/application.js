import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toHomePage() {
      var match = this.store.peekAll('match').get('lastObject');
      if (match.get('hasStarted')) {
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
