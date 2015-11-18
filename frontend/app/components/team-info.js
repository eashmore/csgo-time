import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toBetPage(team) {
      this.sendAction('action', team);
    }
  }
});
