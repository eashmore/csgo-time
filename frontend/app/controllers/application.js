import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toHomePage() {
      var match = this.model.match;
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
