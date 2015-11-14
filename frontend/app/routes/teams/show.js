import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('team', params.team_id);
  },

  renderTemplate() {
    this.render();

    this.store.findRecord('user', window.CURRENT_USER).then(function(user) {
      this.render('items', {
        into: "teams.show",
        outlet: "stash",
        model: user.get('items')
      });
    }.bind(this));

  }
});
