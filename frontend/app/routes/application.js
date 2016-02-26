import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      user: this.store.findRecord('user', window.window.CURRENT_USER),
      match: this.store.findRecord('match', window.App.currentMatchId)
    });
  }
});
