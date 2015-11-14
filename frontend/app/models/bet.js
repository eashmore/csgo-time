import DS from 'ember-data';

export default DS.Model.extend({
  totalValue: DS.attr('number'),

  userId: DS.attr('number'),
  matchId: DS.attr('number'),
  teamId: DS.attr('number'),

  user: DS.belongsTo('user'),
  match: DS.belongsTo('match'),
  team: DS.belongsTo('team'),
  items: DS.hasMany('item'),
});
