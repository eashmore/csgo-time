import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('matches/nextMatch', { path: '/' }, function() {
    this.route('teams', { path:'/', resetNamespace: true }, function() {
      this.route('show', {path: 'teams/:team_id'});
    });
  });

  this.route('users', { path: '/user/:user_id'}, function() {
    this.route('items', { path: '/users/:user_id' });
  });

  this.route('match');
});

export default Router;
