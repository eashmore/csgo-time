import Ember from 'ember';

export default Ember.Component.extend({
  isBet: false,

  actions: {
    moveItem(item) {
      this.sendAction('action', item, this.isBet);

      this.toggleProperty('isBet');
    }
  }
});
