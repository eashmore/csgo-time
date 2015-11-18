import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  actions: {
    betItem(element, isBet) {
      let elementId = element.get('id');
      let htmlId = "#item" + elementId;
      let $el = $(htmlId);

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
