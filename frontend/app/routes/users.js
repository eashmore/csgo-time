import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('application').user;
  },

  renderTemplate(c, model) {
    this.render();

    this.render('items.generate', {
      into: 'users',
      outlet: 'new-items',
      model: this.store.findAll('itemdb')
    });

    this.render('items.stash', {
      into: 'users',
      outlet: 'stash',
      model: model.get('items')
    });
  }
});
