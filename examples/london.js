var TubeMap = require('../').TubeMap;
var readCSVs = require('../').readCSVs;
var Maps = require('../maps');

Maps('london', function(err, tube) {

  console.log(tube.getStationByName('Victoria'));

});