import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('match');
  },

  currentMatch: "",

  controllerName: 'matches',

  afterModel(matches) {
    // var matchIdx = matches.get('length') - 1;
    this.currentMatch = matches.objectAt(0);
    // matches.objectAt(2).get('length')
    Ember.Logger.log(this.currentMatch);

    var that = this;
    var controller = this.controllerFor('matches.index');
    var timer = setInterval(function() {
      var time = controller.updateTime(that.currentMatch);
      if (time <= 0) {
        clearInterval(timer);

        // that.currentMatch.set('hasStarted', true);
        // that.currentMatch.save();

        that.render('matches.inprogress', {
          into: 'matches',
          model: matches.objectAt(0)
        });

      }
    }.bind(controller), 1000);
},

  renderTemplate(c) {
    this.render('matches.index', {
      model: this.currentMatch,
      controller: c
    });

    let controller = this.controllerFor('teams.index');
    this.render('teams.index', {
      into: 'matches.index',
      outlet: 'teams',
      controller: controller,
      model: this.currentMatch.get('teams'),
    });
  }
});
