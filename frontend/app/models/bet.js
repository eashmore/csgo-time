import DS from 'ember-data';

export default DS.Model.extend({
  userId: DS.attr('number'),
  matchId: DS.attr('number'),
  teamId: DS.attr('number'),

  user: DS.belongsTo('user'),
  match: DS.belongsTo('match'),
  team: DS.belongsTo('team'),
  items: DS.hasMany('item'),
});
