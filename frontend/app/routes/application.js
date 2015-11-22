import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    this.store.findAll('user');

    return this.store.findRecord('user', window.CURRENT_USER);
  }
});
