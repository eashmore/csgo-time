import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    moveItem(item) {
      this.sendAction('action', item);
    }
  }
});
