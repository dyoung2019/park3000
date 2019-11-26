// DOM ELEMENTS 
var refreshOffBtn = document.querySelector('.refresh-off-button')

// GLOBAL JS VARIABLES
var sensorRequestLimit = 4000
var apiKeys = {}

var loadApiKeys = () => {
  var params = new URLSearchParams(window.location.search)

  for (const [key, value] of params.entries()) {
    apiKeys[key] = value
  }
}

// Bing Maps classes are parsed and loaded once this flag is true
  // Add this line to prevent code 
  // // GUARD CLAUSE for use Bing Maps JS classes
  // if (!mapControlLoaded)
  //   return

var mapControlLoaded = false
var mapObject = null

var getMap = () => {
  //Add your post map load code here.
  center = new Microsoft.Maps.Location(-37.818352, 144.959023);

  var map = new Microsoft.Maps.Map('#myMap', 
    {
      credentials: apiKeys.api_key,
      center: center,
      mapTypeId: Microsoft.Maps.MapTypeId.road,
      zoom: 16
    }
  );
  mapObject = map
}

var updateParkingBaysOnMap = () => { 

  // GUARD CLAUSE for use Bing Maps JS classes
  if (!mapControlLoaded) {
    console.log('map object not loaded')
    return
  }

  var sensorData = []
  
  var removeAllPinsFromMap = () => {
    for (var i = mapObject.entities.getLength() - 1; i >= 0; i--) {
      var pushpin = mapObject.entities.get(i);
      if (pushpin instanceof Microsoft.Maps.Pushpin) {
        mapObject.entities.removeAt(i);
      }
    }
  }
  
  var drawPin = sensor => {
    var pinLocation = new Microsoft.Maps.Location(sensor.lat, sensor.lon);

    var pinStatus = 'U'
    var pinColor = 'magenta'
    if (sensor.status === 'Present') {
      pinStatus = 'P'
      pinColor = 'green'
    }

    var pin = new Microsoft.Maps.Pushpin(pinLocation, 
      {
        title: sensor.st_marker_id,
        text: pinStatus,
        color: pinColor
      })
    mapObject.entities.add(pin)
  }

  var drawPinsOnMap = () => {
    removeAllPinsFromMap()
    sensorData.forEach(drawPin)
    handleOnRefresh()
  }

  var handleResponse = (resp) => {
    sensorData = resp
    console.log(sensorData)

    drawPinsOnMap()
  }  

  var fetchParkingSensorData = () => {
    var offset = 0

    var options = {
      // melbourne sensor data url
      url: `https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json`,
      data: {
        "$limit" : sensorRequestLimit,
        "$offset": offset,
      }
    }

    $.ajax(options).done(handleResponse)
  }

  fetchParkingSensorData()
}

var handleMapControlScriptLoaded = () => {
  getMap()
  mapControlLoaded = true
  console.log('Script for Microsoft Map Control now loaded')
  updateParkingBaysOnMap()
}

var handleOnRefresh = () => {
  console.log('all done')
}

var updateInterval = 120000; // 2 mins
// var updateInterval = 60000; // 1 min

var intervalID = setInterval(updateParkingBaysOnMap, updateInterval)

// MANUALLY CLICK TO REFRESH
// refreshOffBtn.addEventListener('click', handleInterval)

var handleClick = () =>  {
  // SWITCH OFF AUTO REFRESH
  clearInterval(intervalID)
}

refreshOffBtn.addEventListener('click', handleClick)

// ON SCRIPT LOAD
loadApiKeys()
