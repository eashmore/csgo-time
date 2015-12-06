import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toHomePage() {
      // this.store.queryRecord('match', { is_current: true });

      // if (nextMatch.get('hasStarted')) {
        // this.transitionToRoute('matches.inprogress');
      // } else {
        this.transitionToRoute('matches.current');
      // }
    },

    toUserPage() {
      this.transitionToRoute('users');
    },

    toBetPage() {
      this.transitionToRoute('bets.show');
    }
  }
});
