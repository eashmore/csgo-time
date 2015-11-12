import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('match', { path: '/match/:id' });
  this.route('team', { path:'/teams/:id'});
});

export default Router;
