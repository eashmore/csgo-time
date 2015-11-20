import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var user = this.modelFor('application');
    return user.get('items');
  },
});
