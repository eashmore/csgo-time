import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toHomePage() {
      this.transitionToRoute('matches.current');
    },

    toUserPage() {
      this.transitionToRoute('users');
    },

    toBetPage() {
      this.transitionToRoute('bets.show');
    }
  }
});
