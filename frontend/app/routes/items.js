import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var user = this.modelFor('users');
    return user.get('items');
  }
});
