// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


window.addEventListener('load', () => {

  var about = document.querySelector('.about')
  var aboutBtn = document.querySelector('.about-close-btn')
  var model = document.querySelector('.model')
  var menuBtn = document.querySelector('.menu-btn')
  var menuList = document.querySelector('.menu-list')
  var container = document.querySelectorAll('.container')
  var containerInput = document.querySelectorAll('.container input')
  var searchForm = document.querySelector('.search-form')
  var searchInput = document.querySelector('.search-input')
  var map = document.querySelector('body')



  // var msMap = document.querySelector('.MicrosoftMap')
  // var noKey = () => {
  //   for (var i = 0; i < 3; i++) {
  //   msMap.children[i].style.zIndex = -4
  //   }
  // }
  // noKey()

  // var nav = document.querySelector('#MicrosoftNav')
  // var locationBtn = document.querySelector('#LocateMeButton')
  // var zoomInBtn = document.querySelector('#ZoomInButton')
  // var zoomOutBtn = document.querySelector('#ZoomOutButton')
  // var navClick = ()=>{
  //   console.log('hahaha')
  //   setTimeout(function() { noKey(); }, 700);
  // }


  // var msDown = () => {
  //   console.log('hohoho')
  //   map.addEventListener('click', navClick)
  // } 

  // nav.addEventListener('click',navClick)
  // locationBtn.addEventListener('click',navClick)
  // zoomInBtn.addEventListener('click',navClick)
  // zoomOutBtn.addEventListener('click',navClick)
  // map.addEventListener('mousemove', msDown)


  var openAbout = () => {
    if (model.classList[1] === 'active') {
      model.classList.remove('active')
    } else {
      model.classList.add('active')
    }
  }

  var openMenu = () => {
    console.log('menu')
    if (menuList.classList[1] === 'active1') {
      menuList.classList.remove('active1')
      container.forEach((aCont) => { aCont.classList.remove('active2') })
    } else {
      menuList.classList.add('active1')
      container.forEach((aCont) => { aCont.classList.add('active2') })
    }
  }

  var oneChecked = () => {
    if (containerInput[0].checked == true) {
      console.log('hi')
    } else {
      console.log('bye')
    }
  }
  var twoChecked = () => {
    if (containerInput[1].checked == true) {
      console.log('2hi')
    } else {
      console.log('2bye')
    }
  }
  var threeChecked = () => {
    if (containerInput[2].checked == true) {
      console.log('3hi')
    } else {
      console.log('3bye')
    }
  }

  var handleForm = (event) => {
    event.preventDefault()
    var quary = searchInput.value
    // var options = {
    //   url: `http://dev.virtualearth.net/REST/v1/Locations?query=${quary}&key=AhRiVF93i8Bg2gtWa8XJbkh8R9iEooDM7slujH4_7joXt9qScM59JUHL2udHZcco&ul=-37.818352, 144.959023`
    // }

    // var handleResponse = res => {
    //   mapObject.entities.clear()

    //   res.resourceSets[0].resources.forEach(poi => {
    //     long = poi.geocodePoints[0].coordinates[0]
    //     lat = poi.geocodePoints[0].coordinates[1]
    //     name = poi.name
    //     var pin = new Microsoft.Maps.Pushpin(
    //       new Microsoft.Maps.Location(long, lat),
    //       { title: `${name}` })
    //     mapObject.entities.push(pin);
    //     // mapObject.setView({ bounds: result.bestView })
    //   })
    // }
    // jQuery.ajax(options).done(handleResponse)
  }

  about.addEventListener('click', openAbout)
  aboutBtn.addEventListener('click', openAbout)
  menuBtn.addEventListener('click', openMenu)
  containerInput[0].addEventListener('click', oneChecked)
  containerInput[1].addEventListener('click', twoChecked)
  containerInput[2].addEventListener('click', threeChecked)

  // searchForm.addEventListener('submit', handleForm)

  var date = new Date();
  var currentDay = date.getDay();
  var currentTime = date.getHours() + date.getMinutes() / 60
  // var currentTime = 22.00

  var testid = [{ "marker_id": "13699W", "rd_seg_id": "23033", "the_geom": [[144.945916, -37.819776], [144.945929, -37.81983], [144.945904, -37.819834], [144.945895, -37.8198], [144.94589, -37.81978], [144.945916, -37.819776]] }, { "marker_id": "1369W", "rd_seg_id": "20186", "the_geom": [[144.956913, -37.813094], [144.956893, -37.8131], [144.95687, -37.813049], [144.95689, -37.813044], [144.956913, -37.813094]] }, { "rd_seg_id": "21860", "the_geom": [[144.983597, -37.81075], [144.983606, -37.810695], [144.983632, -37.810697], [144.983623, -37.810753], [144.983597, -37.81075]] }, { "rd_seg_id": "21994", "the_geom": [[144.989358, -37.818099], [144.989337, -37.818097], [144.989345, -37.818047], [144.989367, -37.818049], [144.989358, -37.818099]] }]

  var rulePayStayZone
  var parkingRule = (resp) => {
    var parkingRestrictionArray = resp

    for (var i = 0; i < parkingRestrictionArray.length; i++) {
      rulePayStayZone = parkingRestrictionArray[i]["pay_stay_zone"]
      var ruleDay = parkingRestrictionArray[i]["day_of_week"] - 1
      var startTime = Number(parkingRestrictionArray[i]["start_time"].slice(11, 13).toString()) + Number(parkingRestrictionArray[i]["start_time"].slice(14, 16).toString()) / 60
      var endTime = Number(parkingRestrictionArray[i]["end_time"].slice(11, 13).toString()) + Number(parkingRestrictionArray[i]["end_time"].slice(14, 16).toString()) / 60

      if (currentDay === ruleDay) {
        if (currentTime > startTime && currentTime < endTime) {
          // console.log('You need to pay')
          // console.log(rulePayStayZone)
        } else {
          // console.log('Free time')
          // console.log(rulePayStayZone)
        }
      }
    }

  }

  var parkingRestriction = () => {
    var optionsSearch = {
      url: `/api/ParkingRestrictions`,
      method: "get"   // default post  patch delete
    }
    $.ajax(optionsSearch).done(function (resp) {
      parkingRule(resp)
    })

  }
  parkingRestriction()


  var payZoneToRdSegId = (resp) => {

  }

  var payStayZoneAndRdSegId = () => {
    var optionsSearch = {
      url: `/api/PayStayZones/`,
      method: "get"   // default post  patch delete
    }
    $.ajax(optionsSearch).done(function (resp) {
      payZoneToRdSegId(resp)
    })
  }
  payStayZoneAndRdSegId()

  // // var pass = (rd_seg_id) => {
  // //   console.log(rd_seg_id)
  // //   payStayZoneAndRdSegId() 
    

  // // } 
 
  // var parkingBayToRdSegId = (resp) => {
  //   console.log(test)
  //   var count = 0
  //   var parkingBayArray = resp
  //   for (var i = 0; i < parkingBayArray.length; i++){
  //     if (parkingBayArray[i]["marker_id"] !== undefined && parkingBayArray[i]["rd_seg_id"] !== undefined) {
  //       console.log(count++)


  //       // var validRdSegId = parkingBayArray[i]["rd_seg_id"]
  //       // for (var j = 0; j < test.length; j++){
  //       //   // debugger
  //       //   if (validRdSegId === test[j]["rd_seg_id"]) {
  //       //     var validPayStayZone = test[j]["pay_stay_zone"]
  //       //     // parkingRestriction(validPayStayZone)
            
  //       //     // console.log(test[j]["pay_stay_zone"])
  //       //   }
  //       // }
  //       // console.log(parkingBayArray[i]["rd_seg_id"])
  //       // console.log(parkingBayArray[i]["marker_id"])
  //       // pass(parkingBayArray[i]["rd_seg_id"])
  //     }  
  //   }
  // }

  // var parkingBay = () => {
  //   var optionsSearch = {
  //     url: `/api/ParkingBays/`,
  //     method: "get"   // default post  patch delete
  //   }
  //   $.ajax(optionsSearch).done(function(resp){
  //     parkingBayToRdSegId(resp)
  //   })
  // }





})


// DOM ELEMENTS 
// var refreshOffBtn = document.querySelector('.refresh-off-button')

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

// // GLOBAL JS VARIABLES
var sensorRequestLimit = 5000
var apiKeys = {}

var loadApiKeys = () => {
  var params = new URLSearchParams(window.location.search)

  for (const [key, value] of params.entries()) {
    apiKeys[key] = value
  }
}

// Bing Maps classes are parsed and loaded once this flag is true
//   Add this line to prevent code 
//   // GUARD CLAUSE for use Bing Maps JS classes
//   if (!mapControlLoaded)
//     return

var mapControlLoaded = false
var mapObject = null

var noOfBayPolygons = 0
var showPinsOnOccupiedOverlay = false

var getMap = () => {
  // Melbourne CBD
  center = new Microsoft.Maps.Location(-37.818352, 144.959023);

  var map = new Microsoft.Maps.Map('.map',
    {
      // credentials: apiKeys.api_key,
      credentials: 'AhRiVF93i8Bg2gtWa8XJbkh8R9iEooDM7slujH4_7joXt9qScM59JUHL2udHZcco',
      center: center,
      mapTypeId: Microsoft.Maps.MapTypeId.road,
      zoom: 16
    }
  );
<<<<<<< HEAD
  //autosuggest class
  Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', function () {
    var manager = new Microsoft.Maps.AutosuggestManager({ map: map });
    manager.attachAutosuggest('#searchBox', '#searchBoxContainer', suggestionSelected);
  });

  var removeAllPinsFromMap = () => {
    for (var i = mapObject.entities.getLength() - 1; i >= 0; i--) {
      var pushpin = mapObject.entities.get(i);
      if (pushpin instanceof Microsoft.Maps.Pushpin) {
        mapObject.entities.removeAt(i);
=======
  mapObject = map
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
  var apiParkingBaysEndpoint = '/api/ParkingBays'

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
>>>>>>> massive changes; draw bays on landing page
      }
    }

    $.ajax(options).done(handleParkingSensorsResponse)
  }

  function suggestionSelected(result) {
    //Remove previously selected suggestions from the map.
    // map.entities.clear();
    removeAllPinsFromMap()
    //Show the suggestion as a pushpin and center map over it.
    var pin = new Microsoft.Maps.Pushpin(result.location);
    map.entities.push(pin);
    map.setView({ bounds: result.bestView });
  }
  mapObject = map
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
  var apiParkingBaysEndpoint = '/api/ParkingBays'

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
<<<<<<< HEAD
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
=======
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
>>>>>>> massive changes; draw bays on landing page
    }
  }

<<<<<<< HEAD
  var showOccupiedBaysOnMap = () => {
    // GUARD CLAUSE for use Bing Maps JS classes
    if (!mapControlLoaded) {
      console.log('map object not loaded')
      return
    }

=======
>>>>>>> massive changes; draw bays on landing page
    // TODO: draw polys
    removeAllEntitiesFromMap()
    drawAllParkingBays()
  }

  showOccupiedBaysOnMap()
}

var updateSensors = () => {
  updateParkingSensorLookup(drawOccupiedOverlayOntoMap)
}


var handleMapControlScriptLoaded = () => {
  // console.log('handle')
  getMap()
  mapControlLoaded = true
  console.log('Script for Microsoft Map Control now loaded')
  // DEFAULT
  preloadBaysIntoClient()
  updateSensors()
}

// var updateInterval = 60000; // 1 min
var updateInterval = 120000; // 2 mins
var intervalID = setInterval(updateSensors, updateInterval)

// // ON SCRIPT LOAD
loadApiKeys()

window.handleMapControlScriptLoaded = handleMapControlScriptLoaded

