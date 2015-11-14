import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let match = this.modelFor('matches.nextMatch');
    return match.get('teams');
  },

  controllerName: 'teams',

});
