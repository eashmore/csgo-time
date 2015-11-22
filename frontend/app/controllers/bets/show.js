import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toMatchPage() {
      this.transitionToRoute('matches.current');
    }
  }
});
