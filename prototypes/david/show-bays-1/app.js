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

var handleMapControlScriptLoaded = () => {
  getMap()
  mapControlLoaded = true
  console.log('Script for Microsoft Map Control now loaded')
  // updateParkingBaysOnMap()
}


var shaveDecimalPlacesOnCoords = (point, maxDecimalPlaces)  => {
  return [
    Number(point[0].toFixed(maxDecimalPlaces)),
    Number(point[1].toFixed(maxDecimalPlaces))
  ]
}

var convertPointToLocation = point => {
  var coord = shaveDecimalPlacesOnCoords(point, 6)
  var latitude = coord[1]
  var longitude = coord[0]
  return new Microsoft.Maps.Location(latitude, longitude)
}

var parkingBays = []
var preloadBaysIntoClient = () => {
  var apiParkingBaysEndpoint = 'http://localhost:3000/api/ParkingBays'

  var storeBays = resp => {
    var records = resp
    records.forEach(record => {
      var bay = {
        marker_id: record.marker_id,
        rd_seg_id: record.rd_seg_id,
        points: record.the_geom.map(convertPointToLocation)
      }

      parkingBays.push(bay)
    })
  }

  var getAllParkingBays = () => {
    var options = {
      url: apiParkingBaysEndpoint
    }

    $.ajax(options).done(storeBays)
  }

  getAllParkingBays()
}

var parkingSensorLookup = {}
var updateParkingSensorLookup = (callback) => {
  // melbourne sensor data url
  var sensorEndpointURL = 'https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json'

  var extractLocation = record => {
    return [Number(record.lon), Number(record.lat)]
  }

  var handleParkingSensorsResponse = resp => {
    // 1. put them into a sensor data lookup (=sensorLookup) by st_marker_id  
    var records = resp
    
    records.forEach(record => {
      var key = record.st_marker_id
      var value = record.status === 'Present'
      var point = extractLocation(record)
      // debugger
      parkingSensorLookup[key] = { 
        marker_id: key,
        location: convertPointToLocation(point),
        isOccupied: value 
      }
    })
    callback()
  }

  var loadParkingSensorData = () => {
    // 1. load via ajax of sensor data to url for sensor data
    // 2. once, run callback __buildSensorLookup__  
    
    var offset = 0

    var options = {
      url: sensorEndpointURL,
      data: {
        "$limit" : sensorRequestLimit,
        "$offset": offset,
      }
    }

    $.ajax(options).done(handleParkingSensorsResponse)
  }
  
  loadParkingSensorData()
}

var noOfBayPolygons = 0
var showPinsOnOccupiedOverlay = false

// BAY STYLES

var noMarkerIDStyle = {
  fillColor: 'rgba(180, 180, 180, 0.5)',
  strokeColor: 'black',
  strokeThickness: 1
}

var sensorNotFoundStyle = {
  fillColor: 'rgba(180, 180, 180, 0.5)',
  strokeColor: 'black',
  strokeThickness: 1
}

var occupiedBayStyle = {
  fillColor: 'rgba(255, 0, 255, 0.5)',
  strokeColor: 'rgba(255, 0, 255, 0.75)',
  strokeThickness: 1
}

var unoccupiedBayStyle = {
  fillColor: 'rgba(0, 255, 0, 0.5)',
  strokeColor: 'rgba(0, 255, 0, 0.75)',
  strokeThickness: 2
} 

var drawOccupiedOverlayOntoMap = () => {
  var drawPolygonOnMap = (points, style) => {
    var polygon = new Microsoft.Maps.Polygon(points, {
      fillColor: style.fillColor,
      strokeColor: style.strokeColor,
      strokeThickness: style.strokeThickness
    })

    //Add the polygon to map
    mapObject.entities.push(polygon)
    noOfBayPolygons += 1
  }

  var drawBayAsOccupied = bay => {
    drawPolygonOnMap(bay.points, occupiedBayStyle)
  }

  var drawBayAsUnoccupied = bay => {
    drawPolygonOnMap(bay.points, unoccupiedBayStyle)
  }

  var drawBayAsNoMarkerID = bay => {
    drawPolygonOnMap(bay.points, noMarkerIDStyle)
  }

  var drawBayAsSensorNotFound = bay => {
    drawPolygonOnMap(bay.points, sensorNotFoundStyle)
  }

  var drawPin = sensor => {
    var pinLocation = sensor.location;

    var pinStatus = 'U'
    var pinColor = 'green'
    if (!!sensor.isOccupied) {
      pinStatus = 'P'
      pinColor = 'magenta'
    }

    var pin = new Microsoft.Maps.Pushpin(pinLocation, 
      {
        title: sensor.marker_id,
        text: pinStatus,
        color: pinColor
      })
    mapObject.entities.add(pin)
  }

  var drawParkingBayWithSensor = bay => {
    var markerID = bay.marker_id
 
    if (markerID === undefined) {
      drawBayAsNoMarkerID(bay)
    } else {
      var sensor = parkingSensorLookup[markerID]
      if (sensor === undefined) {
        drawBayAsSensorNotFound(bay)
      } else {
        if (sensor.isOccupied) {
          drawBayAsOccupied(bay)
        } else {
          drawBayAsUnoccupied(bay)
        }
      }
    }
  }

  var removeAllEntitiesFromMap = () => {
    var length = mapObject.entities.getLength()
    for (var i = length - 1; i >= 0; i--) {
      var pushpin = mapObject.entities.get(i);
      if (pushpin instanceof Microsoft.Maps.Pushpin) {
        mapObject.entities.removeAt(i);
      }
    }
    noOfBayPolygons = 0
  }

  var drawAllPins = () => {
    for(var key in parkingSensorLookup) {
      drawPin(parkingSensorLookup[key])
    }
  }

  var drawAllParkingBays = () => {
    parkingBays.forEach(drawParkingBayWithSensor)

    if (showPinsOnOccupiedOverlay) {
      drawAllPins()
    }
  }

  var showOccupiedBaysOnMap = () => {
    // GUARD CLAUSE for use Bing Maps JS classes
    if (!mapControlLoaded) {
      console.log('map object not loaded')
      return
    }

    // TODO: draw polys
    removeAllEntitiesFromMap()
    drawAllParkingBays()
  }

  showOccupiedBaysOnMap()
}

var handleClick = () => {
  updateParkingSensorLookup(drawOccupiedOverlayOntoMap)
}

refreshOffBtn.addEventListener('click', handleClick)

// ON SCRIPT LOAD
loadApiKeys()
preloadBaysIntoClient()

