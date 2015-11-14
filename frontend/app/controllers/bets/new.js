import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  actions: {
    submitBet() {
      var currentUser = this.store.peekRecord('user', window.CURRENT_USER);
      var team = this.model;

      let matches = team.get('matches');
      var nextMatch = matches.objectAt(matches.get('length') - 1);

      // Ember.Logger.log(nextMatch.get('id'));

      var newBet = this.store.createRecord('bet', {
        userId: currentUser.get('id'),
        teamId: team.get('id'),
        matchId: nextMatch.get('id')
      });

      newBet.save();

      let itemElements = $('.newbet').find('.list-item');

      let itemIds = [];
      for (var i = 0; i < itemElements.length; i++) {
        itemIds.push($(itemElements[i]).attr('data-item-id'));
      }

      itemIds.forEach(function(itemId) {
        let item = this.store.peekRecord('item', itemId);
        item.setProperties({'userId': 0, 'betId': newBet.get('id')});
        item.save();
      }.bind(this));
    }
  }
});
