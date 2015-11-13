import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
  isNewSerializerAPI: true,

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  }
});
