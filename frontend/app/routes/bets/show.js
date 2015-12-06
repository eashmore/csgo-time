import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var user = this.store.peekRecord('user', window.CURRENT_USER);
    return user.get('bets').get('lastObject');
  },

  setupController(controller, model) {
    controller.set('model', model);
    if (model) {
      this.store.findRecord('team', model.get('teamId'));
      this.store.query('item', { bet_id: model.get('id') });

      var matches = this.store.peekAll('match');
      var currentMatch = matches.find(function(match) {
        return match.get('isCurrent') === true;
      });

      controller.checkIsBetForCurrentMatch(currentMatch, model);
    }
  }
});
