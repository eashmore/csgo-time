import Ember from 'ember';

export default Ember.Controller.extend({
  matchesController: Ember.inject.controller('matches.current'),

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

    if (match.get('currentRound') < 16) {
      match.incrementProperty('currentRound');
      match.save();
    }
  },

  simulateMatch() {
    var sim = setInterval(function() {
      var match = this.model;
      var teams = this.get('sortedTeams');

      var team1 = teams.get('firstObject');
      var team2 = teams.get('lastObject');

      if (team1.get('score') >= 9 || team2.get('score') >= 9) {
        clearInterval(sim);
        var winner = team1.get('score') > team2.get('score') ? team1 : team2;

        match.set('winnerId', winner.get('id'));
        match.set('winner', winner);
        match.save();

        var matchesController = this.get('matchesController');
        matchesController.payBets();
      } else {
        this.simulateRound(match, team1, team2);

      }
    }.bind(this), 2000);
  }
});
