import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),

  items: DS.hasMany('item'),
  bets: DS.hasMany('bet')
});
