var TubeMap = require('../').TubeMap;
var readCSVs = require('../').readCSVs;

var files = {
  connections: __dirname + '/../datasets/london.connections.csv',
  lines: __dirname + '/../datasets/london.lines.csv',
  stations: __dirname + '/../datasets/london.stations.csv'
};

readCSVs(files, function(err, csvs) {

  var tubemap = new TubeMap({
    connections: csvs[0],
    lines: csvs[1],
    stations: csvs[2]
  });
  var euston = tubemap.getStationByName("Euston");
  var victoria = tubemap.getStationByName("Victoria");
  var victoriaLine = tubemap.getLineByName("Victoria Line");

  console.log(tubemap.path(victoria, euston, victoriaLine.line));
});