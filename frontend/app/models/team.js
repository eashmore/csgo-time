import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  odds: DS.attr('number'),
  score: DS.attr('number'),
  avatarUrl: DS.attr('string'),

  matches: DS.hasMany('match'),
  bets: DS.hasMany('bet')
});
