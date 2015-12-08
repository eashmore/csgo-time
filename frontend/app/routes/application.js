import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      user: this.store.findRecord('user', window.CURRENT_USER),
      match: this.store.queryRecord('match', { is_current: true })
    });
  }
});
