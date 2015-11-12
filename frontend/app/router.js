import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('match', { path: '/match/:match_id' });
  this.route('team', { path:'/teams/:team_id' });
});

export default Router;
