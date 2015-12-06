import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var user = this.store.peekRecord('user', window.CURRENT_USER);
    return user.get('bets').get('lastObject');
  },

  setupController(controller, model) {
    controller.set('model', model);
    if (model) {
      this.store.query('team', { id: model.get('teamId') });
      this.store.query('item', { betId: model.get('id') });

      var match = this.store.peekAll('match').get('lastObject');
      controller.checkIsBetForCurrentMatch(match, model);
    }
  }
});
