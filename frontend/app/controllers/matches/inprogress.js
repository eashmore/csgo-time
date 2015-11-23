import Ember from 'ember';

export default Ember.Controller.extend({
  matchesController: Ember.inject.controller('matches.current'),

  sortedTeams: [],

  simulateMatch(match) {
    function sortTeams() {
      var teams = match.get('teams');
      return teams.sortBy('id');
    }

    function simulateRound() {
      var win = Math.round(Math.random() - 0.2);
      if (win === 0) {
        team1.incrementProperty('score');
        team1.save();
      } else {
        team2.incrementProperty('score');
        team2.save();
      }

      if (match.get('currentRound') < 16) {
        match.incrementProperty('currentRound');
        match.save();
      }
    }

    function isOver() {
      var teams = sortTeams();
      that.set('sortedTeams', teams);

      team1 = teams.get('firstObject');
      team2 = teams.get('lastObject');

      if (team1.get('score') >= 9 || team2.get('score') >= 9) {

        var winner = team1.get('score') > team2.get('score') ? team1 : team2;

        match.set('winnerId', winner.get('id'));
        match.set('winner', winner);
        match.save();

        var matchesController = that.get('matchesController');
        matchesController.payBets(match);
        return true;
      }
      return false;
    }

    var that = this;
    var team1 = null;
    var team2 = null;

    isOver(team1, team2);

    var sim = setInterval(function() {
      if (isOver()) {
        clearInterval(sim);
      } else {
        simulateRound();
      }
    }, 2000);
  }
});
