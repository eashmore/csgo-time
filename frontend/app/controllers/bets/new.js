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

  successfulSave(bet, itemHash) {
    var keys = Object.keys(itemHash);
    for (var i = 0; i < keys.length; i++) {
      var item = itemHash[keys[i]];
      item.setProperties({'userId': null, 'betId': bet.get('id'), 'user': null});
      item.save();
      // currentUser.get('items').removeObject(item);

      this.transitionToRoute('matches.index');
    }
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
      newBet.save().then(this.successfulSave(newBet, itemIds));
    }
  }
});
