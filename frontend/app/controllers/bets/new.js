import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  newBet(nextMatch, currentUser) {
    var team = this.model;
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
      function successfulSave(bet) {
        var keys = Object.keys(itemIds);
        for (var i = 0; i < keys.length; i++) {
          var item = itemIds[keys[i]];
          item.setProperties(
            {'userId': null, 'betId': bet.get('id'), 'user': null}
          );
          item.save();

          nextMatch.get('bets').pushObject(bet);
          currentUser.get('items').removeObject(item);

          that.transitionToRoute('matches.current');
        }
      }

      var that = this;
      var itemIds = this.getItemIds();
      var totalBet = 0;
      var currentUser = this.store.peekRecord('user', window.CURRENT_USER);
      var matches = this.model.get('matches');
      var nextMatch = matches.get('firstObject');

      var newBet = this.newBet(nextMatch, currentUser);

      Object.keys(itemIds).forEach(function(itemId) {
        var item = itemIds[itemId];

        newBet.get('items').pushObject(item);
        totalBet += item.get('price');
      });

      newBet.set('totalValue', totalBet);
      newBet.save().then(successfulSave);
    }
  }
});
