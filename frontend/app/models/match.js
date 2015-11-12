import DS from 'ember-data';

export default DS.Model.extend({
  start_time: DS.attr('date'),
  has_started: DS.attr('boolean'),
  current_round: DS.attr('number'),

  teams: DS.has_many('team'),
  winner: DS.belongs_to('team')
});
