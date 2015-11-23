import Ember from 'ember';

export default Ember.Controller.extend({
  betsController: Ember.inject.controller('bets.show'),

  actions: {
    toTeamPage(team) {
      // var user = this.store.peekRecord('user', window.CURRENT_USER);

      if (this.get('betsController').isCurrentMatch) {
        this.transitionToRoute('bets.show');
      } else {
        this.transitionToRoute('teams.show', team.get('id'));
      }
    }
  }
});
