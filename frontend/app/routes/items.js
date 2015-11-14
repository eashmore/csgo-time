import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let user = this.modelFor('application');
    return user.get('items');
  },

});
