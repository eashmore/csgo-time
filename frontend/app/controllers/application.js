import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toHomePage() {
      this.transitionToRoute('matches');
    },

    toUserPage() {
      this.transitionToRoute('users');
    },

    toBetPage() {
      this.transitionToRoute('bets.show');
    }
  }
});
