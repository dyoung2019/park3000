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
  bayLookup = {
    '2234N': {
      marker_id: '2234N',
      the_geom: [
          // long, lat
          [144.96048178479543,  -37.81610776327627],
          [144.9604894137553,   -37.81612473568111],
          [144.960434430434,    -37.81614028921013],
          [144.96042683584596,  -37.816123306583194],
          [144.96048178479543,  -37.81610776327627]
      ]
    },
    'C6954': { 
      the_geom:[
        [144.95604764867957, -37.8092430176063],
        [144.95604407727245, -37.8092630031639],
        [144.95598187054196, -37.809257720278005], 
        [144.95598567085412, -37.809237754917085],
        [144.95604764867957, -37.8092430176063]
      ]
    },
    'C6956': { 
      the_geom:[
        [144.95611020559878, -37.80924832906511],
        [144.95610643587378, -37.80926829856603],
        [144.95604407727245, -37.8092630031639],
        [144.95604764867957, -37.8092430176063],
        [144.95611020559878, -37.80924832906511]
      ]
    },
    'C6958': { 
      the_geom:[
        [144.9560513959366, -37.809222051017244],
        [144.95604764867957, -37.8092430176063],
        [144.95598567085412, -37.809237754917085],
        [144.9559896449303, -37.80921688418733],
        [144.9560513959366, -37.809222051017244]
      ]
    },
    '10001S': {
      the_geom:[
        [144.96950927510187, -37.8235964839301],
        [144.96944035421294, -37.8236163747108],
        [144.96943132603644, -37.82359534778382],
        [144.96950017946574, -37.823575430611854],
        [144.96950927510187, -37.8235964839301]
      ]
    },
    '10003S': {
      the_geom:[
        [144.96943132603644, -37.82359534778382],
        [144.96944035421294, -37.8236163747108],
        [144.969375670324, -37.823635043536775],
        [144.9693666330054, -37.82361406060499],
        [144.96943132603644, -37.82359534778382]
      ]
    },
    '10005S': {
      the_geom:[
        [144.9693666330054, -37.82361406060499],
        [144.969375670324, -37.823635043536775],
        [144.96932165008056, -37.82365063399209],
        [144.96931226823258, -37.82362978659867],
        [144.9693666330054, -37.82361406060499]
      ]
    },
    '10007S': {
      the_geom:[
        [144.96931226823258, -37.82362978659867],
        [144.96932165008056, -37.82365063399209],
        [144.96926378207536, -37.82366733589295],
        [144.9692543064595, -37.82364655266361],
        [144.96931226823258, -37.82362978659867]
      ]
    },
    '10009W': {
      the_geom:[
        [144.9477186313341, -37.80456295205549],
        [144.94774519988977, -37.80456611050571],
        [144.9477365193983, -37.80461520573072],
        [144.947709976099, -37.8046119548975],
        [144.9477186313341, -37.80456295205549]
      ]
    },
    '10011S': { 
      the_geom:[
        [144.96919485277155, -37.82368640991798],
        [144.96912965084874, -37.823705529271194],
        [144.96912062391212, -37.82368450144173],
        [144.96918575835159, -37.823665356597566],
        [144.96919485277155, -37.82368640991798]
      ] 
    },
    '10013S': { 
      the_geom:[
        [144.96912062391212, -37.82368450144173],
        [144.96912965084874, -37.823705529271194],
        [144.96906639038093, -37.8237239890732],
        [144.96905735314132, -37.82370300612018],
        [144.96912062391212, -37.82368450144173]
      ] 
    },
    '10015S': { 
      the_geom:[
        [144.96905735314132, -37.82370300612018],
        [144.96906639038093, -37.8237239890732],
        [144.96900261668932, -37.823742022743424],
        [144.96899323492192, -37.8237211753271],
        [144.96905735314132, -37.82370300612018]
      ] 
    },
    '10017S': { 
      the_geom:[
        [144.96899323492192, -37.8237211753271],
        [144.96900261668932, -37.823742022743424],
        [144.96893953484027, -37.82376034677656],
        [144.9689300593059, -37.823739563523695],
        [144.96899323492192, -37.8237211753271]
      ] 
    },
    '13018N': { 
      the_geom:[
        [144.9469818389402, -37.82106620221598],
        [144.94692488956537, -37.8210826549836],
        [144.94691526877932, -37.821061732315066],
        [144.94697226846316, -37.821045390372205],
        [144.9469818389402, -37.82106620221598]
      ] 
    },
    '13019S': { 
      the_geom:[
        [144.95126149218183, -37.81998462485749],
        [144.95126959092585, -37.82000233325218],
        [144.95120616390687, -37.820020738188994],
        [144.95119796802703, -37.8200030920832],
        [144.95126149218183, -37.81998462485749]
      ] 
    },
    '1301W': { 
      the_geom:[
        [144.95930525324832, -37.818314249006804],
        [144.9592831614981, -37.81832055193238],
        [144.95925986398836, -37.81826966252876],
        [144.9592819899016, -37.81826343860168],
        [144.95930525324832, -37.818314249006804]
      ] 
    },
    '13020N': { 
      the_geom:[
        [144.94692488956537, -37.8210826549836],
        [144.94686794130183, -37.82109910774267],
        [144.9468583065924, -37.8210781550882],
        [144.94688434523613, -37.82107059772085],
        [144.94691526877932, -37.821061732315066],
        [144.94692488956537, -37.8210826549836]
      ] 
    },
    '13021S': { 
      the_geom:[
    [144.95119796802703, -37.8200030920832],
    [144.95120616390687, -37.820020738188994],
    [144.9511510307928, -37.82003685154448],
    [144.95114279952097, -37.82001913002176],
    [144.95119796802703, -37.8200030920832]
    ] 
    },
    '13022N': { 
      the_geom:[
    [144.94686794130183, -37.82109910774267],
    [144.94681099185362, -37.821115561354326],
    [144.94680138826587, -37.82109467502373],
    [144.9468583065924, -37.8210781550882],
    [144.94686794130183, -37.82109910774267]
    ] 
    },
    '13024N': { 
      the_geom:[
    [144.94681099185362, -37.821115561354326],
    [144.9467540435417, -37.82113201405673],
    [144.94674446994003, -37.821111194030216],
    [144.94680138826587, -37.82109467502373],
    [144.94681099185362, -37.821115561354326]
    ] 
    },
    '13026N': { 
      the_geom:[
    [144.94671684864892, -37.82114277606284],
    [144.94665471628133, -37.82116075321221],
    [144.94664517913975, -37.821140012215864],
    [144.9467072889943, -37.821121986015356],
    [144.94671684864892, -37.82114277606284]
    ] 
    },
    '13028N': { 
      the_geom:[
    [144.9440834925692, -37.821202641456416],
    [144.94414236554604, -37.82121674546367],
    [144.9441354427844, -37.82123495172427],
    [144.94407659740025, -37.82122075357218],
    [144.9440834925692, -37.821202641456416]
    ] 
    },
    '13029S': { 
      the_geom:[
    [144.9493820568205, -37.82054828266228],
    [144.94935769638562, -37.82055522998417],
    [144.94934930717343, -37.820536948665854],
    [144.94941331657105, -37.82051830345785],
    [144.94942185685244, -37.820536914528674],
    [144.94940925734736, -37.82054055571962],
    [144.949408038149, -37.82054089225156],
    [144.9493820568205, -37.82054828266228]
    ] 
    },
    '13030N': { 
      the_geom:[
    [144.94401372037524, -37.82120568925481],
    [144.9440206155578, -37.82118757714311],
    [144.9440834925692, -37.821202641456416],
    [144.94407659740025, -37.82122075357218],
    [144.94401372037524, -37.82120568925481]
    ] 
    },
    '13031S': { 
      the_geom:[
    [144.94935787692918, -37.82055523312863],
    [144.94929376961224, -37.82057351522995],
    [144.94928552753865, -37.82055558252048],
    [144.94934948771697, -37.82053695181032],
    [144.94935787692918, -37.82055523312863]
    ] 
    },
    '13032N': { 
      the_geom:[
    [144.94395537990198, -37.82117194802728],
    [144.9440206155578, -37.82118757714311],
    [144.94401372037524, -37.82120568925481],
    [144.94394848354474, -37.82119006101569],
    [144.94395537990198, -37.82117194802728]
    ] 
    },
    '13033S': { 
      the_geom:[
    [144.9492554192229, -37.8205845517043],
    [144.94923506559448, -37.8205903495018],
    [144.9492269421301, -37.82057264685107],
    [144.94928552753865, -37.82055558252048],
    [144.94929376961224, -37.82057351522995],
    [144.94928129280117, -37.82057707383374],
    [144.9492554192229, -37.8205845517043]
    ] 
    },
    '13034N': { 
      the_geom:[
    [144.9438901431147, -37.82115631975695],
    [144.94395537990198, -37.82117194802728],
    [144.94394848354474, -37.82119006101569],
    [144.9438832479038, -37.821174431860264],
    [144.9438901431147, -37.82115631975695]
    ] 
    },
    '13035S': { 
      the_geom:[
    [144.94720164946617, -37.82118011035906],
    [144.9471300063717, -37.821200703860164],
    [144.9471212221118, -37.82118148639326],
    [144.94719285983658, -37.821160881088396],
    [144.94720164946617, -37.82118011035906]
    ] 
    },
    '13036N': { 
      the_geom:[
    [144.94382490751696, -37.821140690570324],
    [144.9438901431147, -37.82115631975695],
    [144.9438832479038, -37.821174431860264],
    [144.94381801115642, -37.821158802649606],
    [144.94382490751696, -37.821140690570324]
    ] 
    },
    '13037S': { 
      the_geom:[
    [144.9471300063717, -37.821200703860164],
    [144.9470740830431, -37.82121677807269],
    [144.94706436626174, -37.821219570803734],
    [144.94705836859217, -37.82122130912502],
    [144.9470495832134, -37.82120209163351],
    [144.9471212221118, -37.82118148639326],
    [144.9471300063717, -37.821200703860164]
    ] 
    },
    '13038N': { 
      the_geom:[
    [144.94375967081277, -37.82112506132847],
    [144.94382490751696, -37.821140690570324],
    [144.94381801115642, -37.821158802649606],
    [144.94375277557359, -37.82114317342339],
    [144.94375967081277, -37.82112506132847]
    ] 
    },
    '13039S': { 
      the_geom:[
    [144.94705836859217, -37.82122130912502],
    [144.94698679283974, -37.82124205240551],
    [144.94697794541236, -37.821222696848714],
    [144.9470495832134, -37.82120209163351],
    [144.94705836859217, -37.82122130912502]
    ] 
    },
    '13040N': { 
      the_geom:[
    [144.94369443527313, -37.82110943207106],
    [144.94375967081277, -37.82112506132847],
    [144.94375277557359, -37.82114317342339],
    [144.94368753888432, -37.82112754414194],
    [144.94369443527313, -37.82110943207106]
    ] 
    },
    '13041S': { 
      the_geom:[
    [144.94698679283974, -37.82124205240551],
    [144.94691521818447, -37.821262795661035],
    [144.94690630757324, -37.8212433020191],
    [144.94697794541236, -37.821222696848714],
    [144.94698679283974, -37.82124205240551]
    ] 
    },
    '13042N': { 
      the_geom:[
    [144.94362919976257, -37.821093802778236],
    [144.94369443527313, -37.82110943207106],
    [144.94368753888432, -37.82112754414194],
    [144.94362230335958, -37.82111191484493],
    [144.94362919976257, -37.821093802778236]
    ] 
    },
    '13043S': { 
      the_geom:[
    [144.94691521818447, -37.821262795661035],
    [144.94684364238032, -37.82128353795127],
    [144.946834669696, -37.82126390714465],
    [144.94690630757324, -37.8212433020191],
    [144.94691521818447, -37.821262795661035]
    ] 
    },
    '13044N': { 
      the_geom:[
    [144.94356396314552, -37.82107817343019],
    [144.94362919976257, -37.821093802778236],
    [144.94362230335958, -37.82111191484493],
    [144.94355706786394, -37.8210962855125],
    [144.94356396314552, -37.82107817343019]
    ] 
    },
    '13045S': { 
      the_geom:[
    [144.94684364238032, -37.82128353795127],
    [144.94677206764834, -37.82130428111727],
    [144.94676303064512, -37.821284512205565],
    [144.946834669696, -37.82126390714465],
    [144.94684364238032, -37.82128353795127]
    ] 
    },

  }


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
  // updateParkingBaysOnMap()
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

var parkingBays = []
var loadParkingBays = () => {
  var options = {
    url: 'http://localhost:3000/api/ParkingBays'
  }

  var handleResponse = (resp) => {
    parkingBays = resp
    console.log('loaded parking bays')
  }

  $.ajax(options).done(handleResponse)
}

// ON SCRIPT LOAD
loadApiKeys()
// loadBayGeometries()
// loadParkingBays()

var loadBaysOntoMap = () => {
  // CONSTANTS 

  var sensorRequestLimit = 4000
  var sensorLookup = {}

  var showParkingBaysOnMap = () => {
    console.log('all done')
  }
}

var parkingBays = []
var preloadBaysIntoClient = () => {
  var apiParkingBaysEndpoint = ''

  var storeBays = resp => {
    parkingBays = resp
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
var updateParkingSensorLookup = () => {
  // melbourne sensor data url
  var sensorEndpointURL = 'https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json'

  var handleParkingSensorsResponse = resp => {
    // 1. put them into a sensor data lookup (=sensorLookup) by st_marker_id  
    var records = resp
    
    records.forEach(record => {
      var key = record.st_marker_id
      var value = record.status === 'Present'
      sensorLookup[key] = value
    })
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

// BAY STYLES

var noMarkerIDStyle = {
  fillColor: 'rgba(180, 180, 180, 0.5)',
  strokeColor: 'black',
  strokeThickness: 1
}

var sensorNotFoundStyle = {
  fillColor: 'rgba(0, 255, 0, 0.5)',
  strokeColor: 'red',
  strokeThickness: 1
}

var occupiedBayStyle = {
  fillColor: 'rgba(255, 0, 255, 0.5)',
  strokeColor: 'black',
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

  var drawParkingBayWithSensor = bay => {
    var markerID = bay.market_id

    if (markerID === undefined) {
      drawBayAsNoMarkerID(bay)
    } else {
      var sensor = parkingSensorLookup(markerID)
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

  var drawAllParkingBays = () => {
    parkingBays.each(parkingBay => { 
      drawParkingBayWithSensor(parkingBay)
    })
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

preloadBaysIntoClient()

