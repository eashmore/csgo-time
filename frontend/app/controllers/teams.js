import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toTeamPage(team) {
      this.transitionToRoute('teams.show', team.get('id'));
    }
  }
});
