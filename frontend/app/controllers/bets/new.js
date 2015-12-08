import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  betsController: Ember.inject.controller('bets.show'),

  newBet(nextMatch, currentUser) {
    var team = this.model;
    var newBet = this.store.createRecord('bet', {
      userId: currentUser.get('id'),
      teamId: team.get('id'),
      matchId: nextMatch.get('id'),
    });

    return newBet;
  },

  actions: {
    submitBet() {
      function getItemIds() {
        var itemElements = $('.newbet').find('.list-item');
        var itemIds = [];

        for (var i = 0; i < itemElements.length; i++) {
          var id = $(itemElements[i]).attr('data-item-id');
          itemIds.push(that.store.peekRecord('item', id));
        }

        return itemIds;
      }

      function successfulSave(bet) {
        for (var i = 0; i < itemIds.length; i++) {
          var item = itemIds[i];
          item.setProperties(
            { 'userId': null, 'betId': bet.get('id'), 'user': null }
          );
          item.save();

          nextMatch.get('bets').pushObject(bet);

          that.get('betsController').set('isBetForCurrentMatch', true);
          that.transitionToRoute('bets.show');
        }

        currentUser.reload();
      }

      var that = this;
      var itemIds = getItemIds();
      var totalBet = 0;
      var currentUser = this.store.peekRecord('user', App.currentUserId);
      var matches = this.store.peekAll('match');
      var nextMatch = matches.find(function(match) {
        return match.get('isCurrent') === true;
      });

      var newBet = this.newBet(nextMatch, currentUser);

      itemIds.forEach(function(item) {
        newBet.get('items').pushObject(item);
        totalBet += item.get('price');
      });

      newBet.set('totalValue', totalBet);
      newBet.save().then(successfulSave);
    }
  }
});
