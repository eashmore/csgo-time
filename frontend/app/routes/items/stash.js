import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var user = this.peekRecord('user', window.CURRENT_USER);
    return user.get('items');
  },
});
