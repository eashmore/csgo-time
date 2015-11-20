import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),

  items: DS.hasMany('item', { inverse: 'user' }),
  bets: DS.hasMany('bet'),
  betItems: DS.hasMany('item', { inverse: null })
});
