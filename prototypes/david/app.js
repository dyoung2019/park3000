var refreshOffBtn = document.querySelector('.refresh-off-button')

var apiKeys = {
  
}

var loadApiKeys = () => {
  var params = new URLSearchParams(window.location.search)

  for (const [key, value] of params.entries()) {
    apiKeys[key] = value
  }
}

loadApiKeys()

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
  console.log('Script for Microsoft Map Control now loaded')

  mapControlLoaded = true
  getMap()
}

var handleOnRefresh = () => {
  console.log('all done')
}

var handleTimeout = () => { 

  // GUARD CLAUSE for use Bing Maps JS classes
  if (!mapControlLoaded)
    return

  var handleSensorResponse = (resp) => {
    var sensorData = resp

      var handleResponse = results => {
        sensorData.forEach(addPin)
      }

      $.ajax({ url: url }).done(handleResponse)
  }  


//   var limit = 4000
//   var offset = 0

  var options = {
    // melbourne sensor data url
    url: `https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json`,
    data: {
      "$limit" : limit,
      "$offset": offset,
    }
  }

  $.ajax(options).done(handleSensorResponse)
}

// var updateInterval = 120000;
var updateInterval = 60000;

// var interval = setInterval(handleTimeout, updateInterval)

// var handleClick = () => {
//   clearInterval(interval)
// }

