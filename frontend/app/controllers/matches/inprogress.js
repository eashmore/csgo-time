import Ember from 'ember';

export default Ember.Controller.extend({
  matchesController: Ember.inject.controller('matches.current'),

  updateMatch(match){
    var checkMatch = setInterval(function() {
      match.reload();
      if (match.get('winnerId')) {
        clearInterval(checkMatch);
      }
    }, 1000);
  }
});
