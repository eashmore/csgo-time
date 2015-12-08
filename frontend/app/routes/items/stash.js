import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var user = this.modelFor('application').user;
    return user.get('items');
  },
});
