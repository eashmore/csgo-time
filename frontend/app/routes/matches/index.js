import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('match');
  },

  currentMatch: "",

  controllerName: 'matches',

  afterModel(matches) {
    var matchIdx = matches.get('length') - 1;
    this.currentMatch = matches.objectAt(matchIdx);

    var that = this;
    if (!that.currentMatch.get('hasStarted')) {
      var controller = this.controllerFor('matches.index');
      var timer = setInterval(function() {
        var time = controller.updateTime(that.currentMatch);
        if (time <= 0) {
          clearInterval(timer);
          that.render('matches.inprogress', {
            into: 'matches',
            model: that.currentMatch
          });
        }
      }.bind(controller), 1000);
    }
  },

  renderTemplate(c) {
    this.render('matches.index', { model: this.currentMatch, controller: c });

    let controller = this.controllerFor('teams.index');
    this.render('teams.index', {
      into: 'matches.index',
      outlet: 'teams',
      controller: controller,
      model: this.currentMatch.get('teams'),
    });
  }
});
