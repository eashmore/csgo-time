import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.peekRecord('user', window.CURRENT_USER);
  },

  renderTemplate(c, model) {
    this.render();

    this.render('items.generate', {
      into: 'users',
      outlet: 'new-items'
    });

    this.render('items', {
      into: 'users',
      outlet: 'stash',
      model: model.get('items')
    });
  }
});
