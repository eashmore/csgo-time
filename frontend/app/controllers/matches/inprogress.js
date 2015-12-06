import Ember from 'ember';

export default Ember.Controller.extend({
  matchesController: Ember.inject.controller('matches.current'),

  updateMatch(match){
    var that = this;

    function payBets() {
      var matchesController = that.get('matchesController');
      matchesController.payBets(match);
    }

    var checkMatch = setInterval(function() {
      match.reload();
      if (match.get('winnerId')) {
        clearInterval(checkMatch);
        payBets();
      }
    }, 1000);
  }
});
