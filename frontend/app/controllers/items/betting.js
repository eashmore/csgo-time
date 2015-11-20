import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  actions: {
    betItem(element, isBet) {
      var elementId = element.get('id');
      var htmlId = "#item" + elementId;
      var $el = $(htmlId);

      $el.remove();

      $el.attr("data-item-id", elementId);

      if (isBet) {
        $('.stash').append($el);
        isBet = false;
      } else {
        $('.newbet').append($el);
        isBet = true;
      }
    }
  }
});
