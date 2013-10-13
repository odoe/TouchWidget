/**
 * @author odoe@odoe.net (Rene Rubalcava)
 */
/*global require, location */
(function() {
  'use strict';
  require({
    async: true,
    parseOnLoad: true,
    packages: [{
      name: 'widgets',
      location: location.pathname.replace(/\/[^\/]+$/, "") + '/widgets'
    }]
  });

  require([
    'require',
    'esri/map',
    'dojo/ready'
  ], function(require, Map, ready) {
    ready(function() {
      var map = new Map('map',{
        basemap:"topo",
        center:[-122.45,37.75],
        zoom: 13,
        sliderStyle:"small"
      });
      map.on('load', function() {
        require(['widgets/TouchWidget'], function(TouchWidget) {
          var touch = new TouchWidget({
            map:map,
            settings: {
              delay: 500,
              innerSize: 10,
              innerColor: [255, 0, 0, 1],
              outerSize: 42,
              outerColor: [255, 0, 0, 0.25]
            }
          });
          touch.startup();
        });
      });
    });
  });

})(this);
