import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  hasStarted: DS.attr('boolean'),
  currentRound: DS.attr('number'),

  startTime: Ember.computed(function() {
    var start = new Date().setHours(20,0,0);
    return new Date(start);
  }),

  teams: DS.hasMany('team', { inverse: 'matches' }),
  winner: DS.belongsTo('team', { inverse: null }),
  // bets: DS.hasMany('bet')
  
});
