import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      user: this.store.findRecord('user', window.App.currentUserId),
      match: this.store.findRecord('match', window.App.currentMatchId)
    });
  }
});
