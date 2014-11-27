var TubeMap = require('../').TubeMap;
var Maps = require('../').Maps;

Maps('london', function(err, tube) {
  console.log(tube.getStationByName('Victoria'));
});