import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  newBet() {
    var currentUser = this.store.peekRecord('user', window.CURRENT_USER);
    var team = this.model;
    var matches = team.get('matches');
    var nextMatch = matches.objectAt(matches.get('length') - 1);

    var newBet = this.store.createRecord('bet', {
      userId: currentUser.get('id'),
      teamId: team.get('id'),
      matchId: nextMatch.get('id'),
    });

    return newBet;
  },

  getItemIds() {
    var itemElements = $('.newbet').find('.list-item');
    var itemIds = {};

    for (var i = 0; i < itemElements.length; i++) {
      var id = $(itemElements[i]).attr('data-item-id');
      itemIds[id] = this.store.peekRecord('item', id);
    }

    return itemIds;
  },

  actions: {
    submitBet() {
      var newBet = this.newBet();
      var itemIds = this.getItemIds();
      var totalBet = 0;

      Object.keys(itemIds).forEach(function(itemId) {
        var item = itemIds[itemId];

        newBet.get('items').pushObject(item);
        totalBet += item.get('price');
      }.bind(this));

      newBet.set('totalValue', totalBet);
      newBet.save();

      Object.keys(itemIds).forEach(function(itemId) {
        var item = itemIds[itemId];
        item.get('user').get('items').removeObject('item');
        item.setProperties({'userId': null, 'betId': newBet.get('id'), 'user': null});
        item.save();
      });

      this.transitionToRoute('matches.index');
    }
  }
});
