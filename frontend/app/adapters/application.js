import DS from 'ember-data';
import $ from 'jquery';

export default DS.RESTAdapter.extend({
  headers: {
    "X-CSRF-Token": $('meta[name="csrf-token"]').attr('content')
  }
});
