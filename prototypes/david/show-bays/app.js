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

var bayLookup = {}
var loadBayGeometries = () => {
  // "Clarendon Street between Grey Street and Albert Street"
  bayLookup['2234N'] = {
    marker_id: '2234N',
    the_geom: [
        // long, lat
        [144.96048178479543,  -37.81610776327627],
        [144.9604894137553,   -37.81612473568111],
        [144.960434430434,    -37.81614028921013],
        [144.96042683584596,  -37.816123306583194],
        [144.96048178479543,  -37.81610776327627]
    ]
  };
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
    var pinColor = 'green'
    if (sensor.status === 'Present') {
      pinStatus = 'P'
      pinColor = 'magenta'
    }

    var pin = new Microsoft.Maps.Pushpin(pinLocation, 
      {
        title: sensor.st_marker_id,
        text: pinStatus,
        subTitle: sensor.bay_id,
        color: pinColor
      })
    mapObject.entities.add(pin)
  }

  var drawPinsOnMap = () => {
    removeAllPinsFromMap()
    sensorData.forEach(drawPin)
    handleOnRefresh()
  }

  var shaveDecimalPlacesOnCoords = (point, maxDecimalPlaces)  => {
    return [
      Number(point[0].toFixed(maxDecimalPlaces)),
      Number(point[1].toFixed(maxDecimalPlaces))
    ]
  }
  
  var drawBay = sensor => {
    
    var found = bayLookup[sensor.st_marker_id]
    if (found !== undefined) {
      console.log('found work')
      drawPin(sensor)
      var parkingGeom = found.the_geom
      
      console.log(`CENTER: (${sensor.lat}, ${sensor.lon})`)

      var corners = parkingGeom.map(point => {
        var coord = shaveDecimalPlacesOnCoords(point, 10)
        var latitude = coord[1]
        var longitude = coord[0]
        return new Microsoft.Maps.Location(latitude, longitude)
      })
      
      // console.log(corners)
      
      //Create a polygon
      var polygon = new Microsoft.Maps.Polygon(corners, {
          fillColor: 'rgba(0, 255, 0, 0.5)',
          strokeColor: 'red',
          strokeThickness: 2
      })

      //Add the polygon to map
      mapObject.entities.push(polygon)      
    // corners.forEach((corner, i) => {
    //   var title = `${i}: (${corner.latitude}, ${corner.longitude})`
    //   console.log(title)
    //   var pin = new Microsoft.Maps.Pushpin(corner, 
    //     {
    //       title: title,
    //       text: i.toString(),
    //     }
    //   )
    //   mapObject.entities.add(pin)
    // })
    // var center = new Microsoft.Maps.Location(sensor.lat, sensor.lon);

    // var exteriorRing = [
    //     center,
    //     new Microsoft.Maps.Location(center.latitude - 0.1, center.longitude - 0.5),
    //     new Microsoft.Maps.Location(center.latitude - 0.1, center.longitude + 0.5),
    //     center
    // ];

    // //Create a polygon
    // var polygon = new Microsoft.Maps.Polygon(exteriorRing, {
    //     fillColor: 'rgba(0, 255, 0, 0.5)',
    //     strokeColor: 'red',
    //     strokeThickness: 2
    // });

    //Add the polygon to map
    // mapObject.entities.push(polygon);
    }
  }

  var drawBaysOnMap = () => {
    sensorData.forEach(drawBay)
    handleOnRefresh()
  }

  var handleResponse = (resp) => {
    sensorData = resp
    console.log(sensorData)

    // drawPinsOnMap()
    drawBaysOnMap()
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

// var intervalID = setInterval(updateParkingBaysOnMap, updateInterval)

// MANUALLY CLICK TO REFRESH
refreshOffBtn.addEventListener('click', updateParkingBaysOnMap)

// var handleClick = () =>  {
//   // SWITCH OFF AUTO REFRESH
//   clearInterval(intervalID)
// }

// refreshOffBtn.addEventListener('click', handleClick)

// ON SCRIPT LOAD
loadApiKeys()
loadBayGeometries()
