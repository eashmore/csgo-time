import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var user = this.store.peekRecord('user', window.CURRENT_USER);
    var bet = user.get('bets').get('lastObject');

    return Ember.RSVP.hash({
      bet: bet,
      betItems: user.get('betItems')
    });
  }
});
