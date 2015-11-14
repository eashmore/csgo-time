import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('matches', { path: '/' }, function() {
    this.resource('teams', function() {
      this.route('show', {path: '/:team_id'});

      this.resource('bets', function() {
        this.route('new');
      });
    });
  });

  this.resource('users', { path: '/user/'}, function() {
    this.resource('items', function() {
      this.route('generate');
    });
  });

  this.route('items', function() {
    this.route('betting');
  });
});

export default Router;
