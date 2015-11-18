import Ember from 'ember';

export default Ember.Controller.extend({
  matchesController: Ember.inject.controller('matches'),

  team1Wins: "",

  team2Wins: "",

  init() {
    this.simulateMatch();
  },

  sortedTeams: function(){
    var teams = this.model.get('teams');
    return teams.sortBy('id');
  }.property('boardItems.@each.id'),

  simulateRound(match, team1, team2) {
    var win = Math.round(Math.random() - 0.2);

    if (win === 0) {
      team1.incrementProperty('score');
      team1.save();
    } else {
      team2.incrementProperty('score');
      team2.save();
    }
    match.incrementProperty('currentRound');
    match.save();
  },

  simulateMatch() {
    var sim = setInterval(function() {
      var match = this.model;
      var teams = this.get('sortedTeams');

      var team1 = teams.get('firstObject');
      var team2 = teams.get('lastObject');

      this.set('team1Wins', team1.get('score'));
      this.set('team2Wins', team2.get('score'));

      if (this.team1Wins >= 9 || this.team2Wins >= 9) {
        clearInterval(sim);
        var winner = this.team1Wins > this.team2wins ? team1 : team2;
        match.set('winnerId', winner.get('id'));
        match.save();

        var matchesController = this.get('matchesController');
        matchesController.payBets();
      } else {
        this.simulateRound(match, team1, team2);

      }
    }.bind(this), 2000);
  }
});
