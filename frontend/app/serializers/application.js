import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  isNewSerializerAPI: true,

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  },

  attrs: {
    // matches
    teams: { deserialize: 'records', serialize: false },
    winner: { deserialize: 'records', serialize: false },

    // teams
    matches: { deserialize: 'records', serialize: false },

    // items
    bet: { deserialize: 'records', serialize: false },

    // matches, teams and users
    bets: { deserialize: 'records', serialize: false },

    // users, matches and bets
    items: { deserialize: 'records', serialize: false },


    // bets
    user: { deserialize: 'records', serialize: false },
    match: { deserialize: 'records', serialize: false },
    team: { deserialize: 'records', serialize: false }
  }
});
