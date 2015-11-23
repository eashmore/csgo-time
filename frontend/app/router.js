import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('matches', { path: '/' }, function() {
    this.route('current', { path: '/' }, function() {});
    this.route('inprogress', { path: '/match' });

    this.route('teams', { resetNamespace: true }, function() {
      this.route('show', {path: '/:team_id'});
    });

    this.route('bets', { resetNamespace: true }, function() {
      this.route('new');
      this.route('show', { path: '/' });
    });
  });

  this.route('users', { path: '/user', resetNamespace: true }, function() {
    this.route('items', { resetNamespace: true }, function() {
      this.route('stash');
      this.route('generate');
    });
  });
});

export default Router;
