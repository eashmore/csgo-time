import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  match: DS.belongsTo('match'),
  team: DS.belongsTo('team'),
  items: DS.hasMany('item')
});
