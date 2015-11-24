import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  odds: DS.attr('number'),
  roundsWon: DS.attr('number'),
  avatarUrl: DS.attr('string'),

  matches: DS.hasMany('match', { inverse: 'teams' }),
  bets: DS.hasMany('bet')
});
