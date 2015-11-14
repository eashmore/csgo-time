import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findRecord('user', window.CURRENT_USER);
  }
});
