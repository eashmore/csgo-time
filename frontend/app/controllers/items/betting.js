import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  actions: {
    betItem(element) {
      let elementId = element.get('id');
      let htmlId = "#item" + elementId;
      let $el = $(htmlId);

      $el.remove();

      $el.attr("data-item-id", elementId);

      $('.newbet').append("<div>").append($el).append("</div>");
    }
  }
});
