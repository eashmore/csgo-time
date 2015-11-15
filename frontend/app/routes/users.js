import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      user: this.store.peekRecord('user', window.CURRENT_USER),
      itemDB: this.store.findAll('itemdb')
    });
  },

  renderTemplate(c, model) {
    this.render();

    this.render('items.generate', {
      into: 'users',
      outlet: 'new-items',
      model: model.itemDB
    });

    this.render('items.stash', {
      into: 'users',
      outlet: 'stash',
      model: model.user.get('items')
    });
  }
});
