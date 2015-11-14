import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('matches', { path: '/' }, function() {
    this.route('teams', { resetNamespace: true }, function() {
      this.route('show', {path: '/:team_id'});
    });
  });

  this.route('users', { path: '/user/'}, function() {
    this.route('items', function() {
      this.route('generate');
    });
  });

  this.route('bets', function() {
    this.route('new');
  });

});

export default Router;
