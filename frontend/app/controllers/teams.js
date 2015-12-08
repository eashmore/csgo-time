import Ember from 'ember';

export default Ember.Controller.extend({
  betsController: Ember.inject.controller('bets.show'),

  actions: {
    toTeamPage(team) {
      var matches = team.get('matches');

      var currentMatch = matches.find(function(match) {
        return match.get('isCurrent') === true;
      });

      var currentUser = this.store.peekRecord('user', App.currentUserId);
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
