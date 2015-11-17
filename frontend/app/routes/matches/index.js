import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('match');
  },

  controllerName: 'matches',

  afterModel() {
    var controller = this.controllerFor('matches.index');
    setInterval(controller.updateTime.bind(controller), 1000);
  },

  renderTemplate(c, matches) {
    let matchIdx = matches.get('length') - 1;
    let currentMatch = matches.objectAt(matchIdx);

    if (currentMatch.get('hasStarted')) {
      this.render('matches.inprogress', { model: currentMatch });
    } else {
      this.render('matches.index', { model: currentMatch, controller: c });
    }

    let controller = this.controllerFor('teams.index');
    this.render('teams.index', {
      into: 'matches',
      outlet: 'teams',
      controller: controller,
      model: currentMatch.get('teams'),
    });
  }
});
