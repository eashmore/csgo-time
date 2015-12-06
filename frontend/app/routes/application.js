import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(){
    // this.store.findAll('match');
  },

  model() {
    return this.store.findRecord('user', window.CURRENT_USER);
  }
});
