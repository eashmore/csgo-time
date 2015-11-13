import DS from 'ember-data';

export default DS.Model.extend({
  startTime: DS.attr('number'),
  hasStarted: DS.attr('boolean'),
  currentRound: DS.attr('number'),

  teams: DS.hasMany('team', { inverse: 'matches' }),
  winner: DS.belongsTo('team', { inverse: null })
});
