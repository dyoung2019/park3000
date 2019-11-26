# TASKS 

## Timers for 2 minutes (hardcode) to refresh with AJAX call to On Street Parking Bay Sensors

HTML 
1. Create div/canvas with class melb-cbd-map

JS 
OVERVIEW
1. var melbCbdMap = document.querySelector (".melb-cbd-map")
1. On every 2 minutes, make a AJAX call to retrieve sensor data from City of Melbourne API call js function sensorData = fetchParkingSensorData()


fetchParkingSensorData
1. Make jquery AJAX call to https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json,
2. For every record fetch data from own API call
 on bay ids
3. From this api call -  the shape of the data will be

  - bay_id 
      - Number
  - st_marker_id 
    - text 
    - visible description id
  - status
    - string 
    - bool Present / Unoccupied 
  - location -
    - string
    - formatted string of {lat, long}
  - lat
    - Number
    - latitude component of location
  - lon
    - Number 
    - longitude component of location

4. once the data has been returned from the City of Melbourne server, call js callback drawPinsOnMap/drawBaysOnMap
1. Then make ajax call to bing maps (see. updateBingMaps)

## Draw all parking bays in Bing Maps extension

### drawPinsOnMap 

NOTE: callback declared inside fetchParkingSensorData

Inputs:
  - sensor data (records)

1. Create Bing map instance
1. For each sensor,
    1. Create a new pin
    1. Set title =  st_marker_id
    1. Set text to P if Present or U if Unoccupied
1. Once done, call updateBingMaps via AJAX

TODO - Lay down 3000+ pins on Bing Maps (P)resent  and (U)noccupied

###  drawBaysOnMap

NOTE: callback declared inside fetchParkingSensorData

1. Create Bing map instance 
1. Fetch all parking bays with 
GET /api/ParkingBays with AJAX
1. For each bay, insert them into a map/object as bayLookup 
1. For each sensor,
  1. Search inside bayLookup for bay_ID
  1. create new polygon
  1. For each points in the_geom Array
      1. Add point to polygon
  1. Add polygon to map instance
1. Once done, make AJAX call to bing maps to refresh database, 

### Drawing pins on maps

````js 
var handleOnRefresh = () => {}

var handleTimeout = () => {
  var handleSensorResponse = (resp) => {
    var sensorData = resp.records
  
    // if drawing pins on map
    var drawPinsOnMaps = () => {
      var addPinToMap => (map) => {

      }
      
      var map = Microsoft.Map
      sensorData.each(addPinToMap)
      handleOnRefresh()
    }
    var bing_options = {
        url: 'bing maps?callback=drawPinsOnMaps'
    }
    $.ajax(bing_options).done(drawPinsOnMaps)
  }

  var sensor_options =
  {
    url: 'melb sensor url'
  }
  $.ajax(sensor_options).done(handleSensorResponse)
}

var updateTimer = setInterval(handleTimeout, 2 mins (120 secs => 120000 ms))

````

### Drawing bays (as polygons) on map

````js 
var handleOnRefresh = () => {}

var handleTimeout = () => {
  var handleRequest = (resp) => {
    var sensorData = resp.records

    var handleAPIRequest = (resp) => {
      var bays = resp.records

      var buildLookup = (bays) => { // transform }

      var bayLookup = buildLookup(bays)

      var drawBaysOnMaps = () => {
        var map = Microsoft.Map

        var addBayToMap = (sensor) =>|
        {

        }

        sensorData.each(addBayToMap)
      }

      var bing_options = {
        url: 'bing maps?callback=drawBaysOnMaps'
      }
      // AJAX CALL #3
      $.ajax(bing_options).done(handleOnRefresh)
    }

    var api_options = {
      url: '/api/ParkingBays/'
    }
      // AJAX CALL #2
    $.ajax(api_options).done(handleAPIRequest)
  }

  var sensor_options =
  {
    url: 'melb sensor url'
  }
  // AJAX CALL #1
  $.ajax(bing_options).done(handleRequest)
}

var setInterval = setTimer(handleTimeout, 2 mins (120 secs => 120000 ms))

````
