import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('team', params.team_id);
  },

  renderTemplate(c, model) {
    this.render();

    let currentUser = this.modelFor('application');
    this.render('items.betting', {
      into: "teams.show",
      outlet: "stash",
      model: currentUser.get('items')
    });

    this.render('bets.new', {
      into: 'teams.show',
      outlet: 'new-bet',
      model: model
    });
  }
});
