import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  odds: DS.attr('number'),
  avatar_url: DS.attr('string'),

  matches: DS.hasMany('match')
});
