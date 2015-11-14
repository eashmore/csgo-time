import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    withdrawItem(item) {
      item.destroyRecord();
    }
  }
});
