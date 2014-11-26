var TubeMap = require('./index').TubeMap;
var readCSVs = require('./index').readCSVs;

var files = {
  "london": {
    connections: __dirname + '/datasets/london.connections.csv',
    lines: __dirname + '/datasets/london.lines.csv',
    stations: __dirname + '/datasets/london.stations.csv'
  }
};

module.exports = function(city, cb) {
  readCSVs(files[city], function(err, csvs) {

    cb(
      err,
      new TubeMap({
        connections: csvs[0],
        lines: csvs[1],
        stations: csvs[2]
      })
    );

  });

};