var Viewport = require('../utils/viewport');
var config = require('./config');

console.log(config);

var App = function() {
  this.viewport = new Viewport(config.viewport);
  console.log('app constructor');
};

//var router = require('director');

// bind all links beginning with "/" to be routed by director
//$('body').on('click', 'a[href^="/"]:not(.btn-sell)', function(e) {
//  e.preventDefault();
//  var $el = $(e.currentTarget);
//  var href = $el.attr('href');
//  href = href.replace(/^\//, '');
//
//  // launch route handle when href not changed (index 2 == '#/' before href)
//  if (2 === window.location.hash.indexOf(href)) {
//    this.router.dispatch('on', '/' + href);
//  }
//  this.router.setRoute(href);
//}.bind(this));

module.exports = new App();
