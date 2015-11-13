import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('match');
  },

  renderTemplate(c, matches) {
    let matchIdx = matches.get('length') - 1;
    let currentMatch = matches.objectAt(matchIdx);

    this.render('matches.index', { model: currentMatch });

    let controller = this.controllerFor('teams.index');
    this.render('teams.index', {
      into: 'matches',
      outlet: 'teams',
      controller: controller,
      model: currentMatch.get('teams'),
    });
  }
});
