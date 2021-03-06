import Ember from 'ember';

export default Ember.Controller.extend({
  betsController: Ember.inject.controller('bets.show'),

  actions: {
    toTeamPage(team) {
      var currentMatch = team.get('matches').get('lastObject');
      var currentUser = this.store.peekRecord('user', window.CURRENT_USER);
      var mostRecentBet = currentUser.get('bets').get('lastObject');
      if (mostRecentBet &&
          parseInt(currentMatch.get('id')) === mostRecentBet.get('matchId')
      ){
        this.transitionToRoute('bets.show');
      } else {
        this.transitionToRoute('teams.show', team.get('id'));
      }
    }
  }
});
