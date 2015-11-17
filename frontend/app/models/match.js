import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  hasStarted: DS.attr('boolean'),
  currentRound: DS.attr('number'),
  map: DS.attr('string'),
  winnerId: DS.attr('number'),
  team1Score: DS.attr('number'),
  team2Score: DS.attr('number'),

  startTime: Ember.computed(function() {
    var start = new Date().setHours(20,0,0);
    return new Date(start);
  }),

  teams: DS.hasMany('team'),
  // winner: DS.belongsTo('team', { inverse: null }),
  bets: DS.hasMany('bet')

});
