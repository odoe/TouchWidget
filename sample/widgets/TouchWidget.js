/**
* @author rrubalcava@odoe.net (Rene Rubalcava)
*/
/*global window document console define setTimeout Error*/
(function() {
    'use strict';
    define([
           'require',
           'esri/layers/GraphicsLayer',
           'esri/graphic',
           'esri/symbols/SimpleMarkerSymbol',
           'dojo/fx',
           'dojo/_base/fx',
           'dojo/fx/easing',
           'dojo/aspect',
           'dojo/_base/Color'
    ], function (require, GraphicsLayer, Graphic, SimpleMarkerSymbol, fx, coreFx, easing, aspect, Color) {
        var TouchWidget = function (options) {
            if (!options.map) {
                throw new Error('Must provide a map object to use TouchWidget');
            }
            this.map = options.map;
            this.delay = options.delay || 500;
            this.touchLayer = new GraphicsLayer();
            if (this.map.loaded) {
                this.map.addLayer(this.touchLayer);
            } else {
                var self = this;
                require(['dojo/on'], function(on) {
                    on.once(self.map, 'load', function() {
                        self.map.addLayer(self.touchLayer);
                    });
                });
            }
        };

        TouchWidget.prototype._fxArgs = function (graphic) {
            return {
                node: graphic.getDojoShape().getNode(),
                duration: this.delay,
                easing: easing.expoOut
            };
        };

        TouchWidget.prototype.startup = function () {
            var symInner = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
                                                  null,
                                                  new Color([255, 0, 0, 1])),
                symOuter = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 42,
                                                null,
                                                new Color([255, 0, 0, 0.25])),
                self = this;

            this.map.on('click', function (e) {
                var graphicOuter = new Graphic(e.mapPoint, symOuter),
                    graphicInner = new Graphic(e.mapPoint, symInner);
                self.touchLayer.add(graphicOuter);
                self.touchLayer.add(graphicInner);
                setTimeout(function () {
                    var f = fx.combine([
                        coreFx.fadeOut(self._fxArgs(graphicOuter)),
                        coreFx.fadeOut(self._fxArgs(graphicInner))
                    ]);
                    aspect.after(f, 'onEnd', function () {
                        self.touchLayer.remove(graphicOuter);
                        self.touchLayer.remove(graphicInner);
                    });
                    f.play();
                }, self.delay);
            });
            return this;
        };

        return TouchWidget;
    });
}).call(this);
