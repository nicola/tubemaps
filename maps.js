var TubeMap = require('./index').TubeMap;
var readCSVs = require('./index').readCSVs;
var datasets = require('./datasets');

module.exports = function(city, cb) {
  var dataset = require(datasets[city].json);
  cb(null, new TubeMap(dataset));
};