import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toHomePage() {
      var that = this;
      this.store.queryRecord('match', { is_current: true }).then(function(match) {
        if (match.get('hasStarted')) {
          that.transitionToRoute('matches.inprogress');
        } else {
          that.transitionToRoute('matches.current');
        }
      });
    },

    toUserPage() {
      this.transitionToRoute('users');
    },

    toBetPage() {
      this.transitionToRoute('bets.show');
    }
  }
});
