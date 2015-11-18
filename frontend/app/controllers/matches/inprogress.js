import Ember from 'ember';

export default Ember.Controller.extend({
  matchesController: Ember.inject.controller('matches'),

  team1Wins: "",

  team2Wins: "",

  init() {
    this.simulateMatch();
  },

  simulateRound(match) {
    var win = Math.round(Math.random() - 0.2);

    if (win === 0) {
      match.incrementProperty('team1Score');
      match.incrementProperty('currentRound');
      match.save();

    } else {
      match.incrementProperty('team2Score');
      match.incrementProperty('currentRound');

      match.save();
    }
  },

  simulateMatch() {
    var sim = setInterval(function() {
      var match = this.model;
      var teams = match.get('teams');
      var winner;

      this.set('team1Wins', match.get('team1Score'));
      this.set('team2Wins', match.get('team2Score'));

      if (this.team1Wins >= 9 || this.team2Wins >= 9) {
        clearInterval(sim);
        winner = this.team1Wins > this.team2wins ? teams.objectAt(0) : teams.objectAt(1);
        match.set('winnerId', winner.get('id'));
        match.save();

        var matchesController = this.get('matchesController');
        matchesController.payBets();
      } else {
        this.simulateRound(match);

      }
    }.bind(this), 1000);
  }
});
