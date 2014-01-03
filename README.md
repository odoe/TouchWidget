# ArcGIS JavaScript TouchWidget

----
This is a widget to add some graphical feedback functionality for [ArcGIS JavaScript](http://developers.arcgis.com/en/javascript/) applications used on mobile or tablet devices.

One of my gripes is can't always tell when I click on a map. This widget will simply add a graphic to the map where a user clicks and then fade it out.

Demo can be seen [here.](http://www.odoe.net/thelab/js/touch/)

Sample config:

````javascript
{
  "name": "touch",
  "path": "widgets/touch/touchwidget",
  "options": {
    "settings": {
      "delay": 500,
      "innerSize": 10,
      "innerColor": [255, 0, 0, 1],
      "outerSize": 42,
      "outerColor": [255, 0, 0, 0.25]
    }
  }
}
````

*A work in progress*
