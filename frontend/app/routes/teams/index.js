import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var match = this.modelFor('matches.nextMatch');
    return match.get('teams');
  },

  controllerName: 'teams',
});
