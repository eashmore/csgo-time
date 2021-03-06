import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  totalValue: 0,

  numberOfItems: 0,

  actions: {
    betItem(item, isBet) {
      function updateBetInfo() {
        if (isBet) {
          $('div.stash ul').append($el);
          isBet = false;

          newNumberOfItems = that.numberOfItems - 1;
          that.set('numberOfItems', newNumberOfItems);

          newValue = that.totalValue - price;
          that.set('totalValue', newValue);
        } else {
          $('.newbet').append($el);
          isBet = true;

          newNumberOfItems = that.numberOfItems + 1;
          that.set('numberOfItems', newNumberOfItems);

          newValue = that.totalValue + price;
          that.set('totalValue', newValue);
        }
      }

      function isValidBet() {
        if(that.totalValue >= 10 &&
          (that.numberOfItems > 0 && that.numberOfItems < 11)
        ){
          $bettingButton.attr('disabled', false);
        } else {
          $bettingButton.attr('disabled', true);
        }
      }

      var that = this;

      var itemId = item.get('id');
      var price = item.get('price');

      var htmlId = "#item" + itemId;
      var $el = $(htmlId);

      var $bettingButton = $('.place-bet');

      $el.remove();
      $el.attr("data-item-id", itemId);
      var newValue = 0;
      var newNumberOfItems = 0;

      updateBetInfo();

      isValidBet();
    }
  }
});
