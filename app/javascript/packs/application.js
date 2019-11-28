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
    var options = {
      url: `http://dev.virtualearth.net/REST/v1/Locations?query=${quary}&key=AhRiVF93i8Bg2gtWa8XJbkh8R9iEooDM7slujH4_7joXt9qScM59JUHL2udHZcco&ul=-37.818352, 144.959023`
    }

    var handleResponse = res => {
     res.resourceSets[0].resources.forEach(poi => {
       lat = poi.geocodePoints[0].coordinates[0]
       long = poi.geocodePoints[0].coordinates[1]
       name = "hh"
       var pin = new Microsoft.Maps.Pushpin(lat,long {title: `${name}`})
       mapObject.entities.push(pin);
     })
    }
    jQuery.ajax(options).done(handleResponse)
  }

  about.addEventListener('click', openAbout)
  aboutBtn.addEventListener('click', openAbout)
  menuBtn.addEventListener('click', openMenu)
  containerInput[0].addEventListener('click', oneChecked)
  containerInput[1].addEventListener('click', twoChecked)
  containerInput[2].addEventListener('click', threeChecked)

  searchForm.addEventListener('submit', handleForm)

  // var date = new Date();
  // var currentDay = date.getDay();
  // var currentTime = date.getHours()+date.getMinutes()/60
  // // var currentTime = 22.00

  // var testid = [{"marker_id":"13699W","rd_seg_id":"23033","the_geom":[[144.945916,-37.819776],[144.945929,-37.81983],[144.945904,-37.819834],[144.945895,-37.8198],[144.94589,-37.81978],[144.945916,-37.819776]]},{"marker_id":"1369W","rd_seg_id":"20186","the_geom":[[144.956913,-37.813094],[144.956893,-37.8131],[144.95687,-37.813049],[144.95689,-37.813044],[144.956913,-37.813094]]},{"rd_seg_id":"21860","the_geom":[[144.983597,-37.81075],[144.983606,-37.810695],[144.983632,-37.810697],[144.983623,-37.810753],[144.983597,-37.81075]]},{"rd_seg_id":"21994","the_geom":[[144.989358,-37.818099],[144.989337,-37.818097],[144.989345,-37.818047],[144.989367,-37.818049],[144.989358,-37.818099]]}]

  // var rulePayStayZone 
  // var parkingRule = (resp, validPayStayZone) => {
  //   var parkingRestrictionArray = resp
   
  //   for (var i = 0; i < parkingRestrictionArray.length; i++){
  //     rulePayStayZone = validPayStayZone
  //     var ruleDay = parkingRestrictionArray[i]["day_of_week"]-1
  //     var startTime = Number(parkingRestrictionArray[i]["start_time"].slice(11,13).toString()) + Number(parkingRestrictionArray[i]["start_time"].slice(14,16).toString())/60
  //     var endTime = Number(parkingRestrictionArray[i]["end_time"].slice(11,13).toString()) + Number(parkingRestrictionArray[i]["end_time"].slice(14,16).toString())/60

  //     if (currentDay === ruleDay) {
  //       if (currentTime > startTime && currentTime < endTime) {
  //         console.log('You need to pay')
  //         console.log(rulePayStayZone)
  //       } else {
  //         console.log('Free time')
  //         console.log(rulePayStayZone)
  //       }
  //     }
  //   }
  // }
 
    
  // var parkingRestriction = (validPayStayZone) => {
  //   var optionsSearch = {
  //     url: `/api/ParkingRestrictions`,
  //     method: "get"   // default post  patch delete
  //   }
  //   $.ajax(optionsSearch).done(function(resp){
  //     parkingRule(resp, validPayStayZone)
  //   })
    
  // }
  

  // var payZones = [] 
  // var payZoneToRdSegId = (resp) => {
  //   payZones = resp
  //   return payZones
  // }

  // var payStayZoneAndRdSegId = () => {
  //   var optionsSearch = {
  //     url: `/api/PayStayZones/`,
  //     method: "get"   // default post  patch delete
  //   }
  //   $.ajax(optionsSearch).done(function(resp){
  //     test = payZoneToRdSegId(resp)
  //   })
  // }
  // payStayZoneAndRdSegId()

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


  // parkingBay()

})


// DOM ELEMENTS 
// var refreshOffBtn = document.querySelector('.refresh-off-button')

// // GLOBAL JS VARIABLES
// var sensorRequestLimit = 4000
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

var getMap = () => {
  //Add your post map load code here.
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
    var pinColor = 'green'
    if (sensor.status === 'Present') {
      pinStatus = 'P'
      pinColor = 'magenta'
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
    // handleOnRefresh()
    // console.log('done')
  }

  var handleResponse = (resp) => {
    sensorData = resp
    // console.log(sensorData)

    // drawPinsOnMap()
  }

  var fetchParkingSensorData = () => {
    var offset = 0

    var options = {
      // melbourne sensor data url
      url: `https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json`,
      data: {
        "$limit": 4000,
        "$offset": offset,
      }
    }

    $.ajax(options).done(handleResponse)
  }

  fetchParkingSensorData()
}


var handleMapControlScriptLoaded = () => {
  // console.log('handle')
  getMap()
  mapControlLoaded = true
  console.log('Script for Microsoft Map Control now loaded')
  updateParkingBaysOnMap()
}

// var handleOnRefresh = () => {
//   console.log('all done')
// }

var updateInterval = 120000; // 2 mins
// var updateInterval = 60000; // 1 min

var intervalID = setInterval(updateParkingBaysOnMap, updateInterval)

// // MANUALLY CLICK TO REFRESH
// // refreshOffBtn.addEventListener('click', handleInterval)

// var handleClick = () =>  {
//   // SWITCH OFF AUTO REFRESH
//   clearInterval(intervalID)
// }

// refreshOffBtn.addEventListener('click', handleClick)

// // ON SCRIPT LOAD
loadApiKeys()


window.handleMapControlScriptLoaded = handleMapControlScriptLoaded

