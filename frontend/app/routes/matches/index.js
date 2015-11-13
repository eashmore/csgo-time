import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findRecord('match', 1);
  },

  renderTemplate(c, match) {
    this.render();
    
    let controller = this.controllerFor('teams.index');
    this.render('teams.index', {
      into: 'matches',
      outlet: 'teams',
      controller: controller,
      model: match.get('teams'),
    });
  }
});
