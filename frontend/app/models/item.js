import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  price: DS.attr('number'),
  gunType: DS.attr('string'),
  condition: DS.attr('string'),
  rarity: DS.attr('string'),
  isStattrack: DS.attr('boolean'),
  isSouvenir: DS.attr('boolean'),
  imageUrl: DS.attr('string'),
  userId: DS.attr('number'),
  betId: DS.attr('number'),

  user: DS.belongsTo('user'),
  bet: DS.belongsTo('bet')
});
