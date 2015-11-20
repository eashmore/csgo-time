import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toTeamPage(team) {
      var user = this.store.peekRecord('user', window.CURRENT_USER);
      
      if (user.get('bets').get('length') > 0) {
        this.transitionToRoute('bets.show');
      } else {
        this.transitionToRoute('teams.show', team.get('id'));
      }
    }
  }
});
