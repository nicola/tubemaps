var TubeMap = require('../').TubeMap;
var Maps = require('../').Maps;
var london = require('../datasets/london.json')

var tube = new TubeMap(london);

module.exports = tube;