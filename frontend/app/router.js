import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('matches', { path: '/' }, function() {
    this.route('show', { path: '/matches/:match_id'});
    this.route('teams', { path:'/teams/:team_id' });
  });
});

export default Router;
