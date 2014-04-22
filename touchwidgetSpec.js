/*global define, describe, it, expect, beforeEach, afterEach, sinon*/
/*jshint expr:true*/
define([
  'dojo/on',
  'esri/map',
  'esri/layers/GraphicsLayer',
  'widgets/touch/touchwidget'
], function(
  on,
  Map,
  GraphicsLayer,
  TouchWidget
) {
  'use strict';

  var expect = chai.expect;

  return describe(
    'widgets/touch/touchwidget',
    function() {

      var options, widget, map, div;

      beforeEach(function() {
        console.debug('loading');
        div = document.createElement('div');
        document.body.appendChild(div);
        map = new Map(div);
        options = {
          settings: {},
          map: map
        };
        sinon.stub(on, 'once');
        sinon.spy(map, 'addLayer');
        sinon.stub(TouchWidget.prototype, 'own');
        widget = new TouchWidget(options);
      });
      afterEach(function() {
        on.once.restore();
        map.addLayer.restore();
        TouchWidget.prototype.own.restore();
        widget.destroy();
        document.body.removeChild(div);
      });

      it(
        'will be a valid object when created',
        function() {
          expect(widget).to.be.ok;
        }
      );

      it(
        'will copy options passed to it',
        function() {
          expect(widget.options).to.eql(options);
        }
      );

      it(
        'will have a default delay of 500',
        function() {
          expect(widget.delay).to.eql(500);
        }
      );

      it(
        'will have a delay defined in options',
        function() {
          options.settings.delay = 100;
          widget = new TouchWidget(options);
          expect(widget.delay).to.eql(100);
        }
      );

      it(
        'will have its own GraphicsLayer',
        function() {
          expect(widget.touchLayer).to.be.an.instanceOf(GraphicsLayer);
        }
      );

      describe(
        '#startup',
        function() {

          it(
            'will throw error when no map provided',
            function() {
              expect(widget.startup).to.throw(Error);
            }
          );

          it(
            'will wait for map to load if not loaded',
            function() {
              options.map = map;
              widget = new TouchWidget(options);
              widget.startup();
              expect(on.once.calledOnce).to.be.ok;
            }
          );

          it(
            'will initialize when map is loaded',
            function() {
              map.loaded = true;
              options.map = map;
              widget = new TouchWidget(options);
              widget.startup();
              expect(widget.loaded).to.be.ok;
              expect(map.addLayer.calledWith(
                widget.touchLayer
              )).to.be.ok;
              expect(TouchWidget.prototype.own.calledOnce).to.be.ok;
            }
          );

          it(
            'will emit event when map is loaded',
            function() {
              map.loaded = true;
              options.map = map;
              widget = new TouchWidget(options);
              sinon.stub(widget, 'emit');
              widget.startup();
              expect(widget.emit.calledWith('load')).to.be.ok;
              widget.emit.restore();
            }
          );

        }
      );
    });

});
