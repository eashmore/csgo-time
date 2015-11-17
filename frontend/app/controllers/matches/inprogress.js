import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  team1Wins: "",

  team2Wins: "",

  init() {
    this.simulateMatch();
  },

  simulateRound(match) {
    var win = Math.round(Math.random());

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
      } else {
        this.simulateRound(match);

      }
    }.bind(this), 2000);
  }
});
