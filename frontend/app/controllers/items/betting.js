import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  totalValue: 0,

  numberOfItems:0,

  actions: {
    betItem(item, isBet) {
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

      if (isBet) {
        $('.stash').append($el);
        isBet = false;
        this.numberOfItems -= 1;
        this.totalValue -= price;
      } else {
        $('.newbet').append($el);
        isBet = true;
        this.numberOfItems += 1;
        this.totalValue += price;
      }

      Ember.Logger.log(this.totalValue);
      Ember.Logger.log($bettingButton.attr('disabled'));

      isValidBet();
    }
  }
});
