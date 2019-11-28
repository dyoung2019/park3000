# Draw bays on map

## PSUEDO-CODE

1. On load, pull bay info
2. When sensor data refreshes,
  1. clear all entities on map
  1. draw bays based on status and overlay
  1. draw pins based

````js
var parkingBays = []
var preloadBaysIntoClient = () => {
  var storeBays = (resp) => {
    parkingBays = resp
  }

  var getAllParkingBays = () => {
    ajax.done(storeBays)
  }

  getAllParkingBays()
}

var handleInterval = () => {
  var buildSensorLookup = (resp) => {
    lookup = {}
    showOccupiedBaysOnMap(lookup)
  }
  
  var loadParkingSensorData = () => {
    ajax.done(buildSensorLookup)
  }
  
  loadParkingSensorData()
}

var drawOccupiedOverlayOntoMap = () => {
  var drawParkingBayWithSensor = (bay, sensor, style) => {
    
  }

  var showOccupiedBaysOnMap = lookup => {
    bays.each( bay => drawParkingBayWithSensor(bay, lookup, style))
  }
}
````

### preloadBaysIntoClient
1. call getAllParkingBays

### getAllParkingBays
  input 
    - sensorLookup
      - global variable


1. load via ajax url '/api/ParkingBays/'
1. once done, call __storeBays__

### storeBays
  input
    resp

  output 
    - parkingBays
      - global variable

1. parkingBays = resp 


### drawOverlayOntoMap
1. call __loadParkingSensorData__

### loadParkingSensorData

1. load via ajax of sensor data to url for sensor data
1. once, run callback __buildSensorLookup__

### buildSensorLookup
1. put them into a sensor data lookup (=sensorLookup) by st_marker_id
1. once done, run callback __getAllParkingBays__



### showParkingBaysOnMap
1. once done, for each parkingBays 
    1. if bay doesn't has marker_id
      1. draw no-marker polygon (i.e. grey polygon) from coordinates
    1. otherwise 
        1. search inside sensorLookup by bay.marker_id
        1. if bay.marker_id was not found in sensorLookup
          draw no-sensor-found (i.e. darker grey) polygon from coordinates
        1. else 
            if sensor.status === 'present'
              draw present (i.e magneta) polygon with point
            else
              draw unoccupied (i.e. green) polygon with point

1. NOW finished
            
