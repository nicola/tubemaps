# Tubemaps

Given a dataset, get all the tube/stations relations done!

![London tubemap](https://raw.githubusercontent.com/nicola/tubemaps/master/thumbnail.png)

[Visualizing the tube](http://bl.ocks.org/nicola/69730fc4180246b0d56d) in D3 and TubeMaps.

## Install
```bash
$ npm install --save tubemaps
```

For command-line use:
```bash
$ npm install --g tubemaps
```

Soon on **bower**.

## Command line tool

For now Command line only supports London

```sh
$ tubemaps path  --from "Euston" --to "Hammersmith"
# Victoria Line: Euston to Warren Street
# Victoria Line: Warren Street to Oxford Circus
# Victoria Line: Oxford Circus to Green Park
# Victoria Line: Green Park to Victoria
# Victoria Line: Victoria to Sloane Square
# District Line: Sloane Square to South Kensington
# Piccadilly Line: South Kensington to Gloucester Road
# Piccadilly Line: Gloucester Road to Earl's Court
# District Line: Earl's Court to Barons Court
# Piccadilly Line: Barons Court to Hammersmith

$ tubemaps station "Euston" --london                    
# Northern Line: Camden Town
# Victoria Line: King's Cross St. Pancras
# Northern Line: Mornington Crescent
# Victoria Line: Warren Street
# Victoria Line: King's Cross St. Pancras
# Victoria Line: Warren Street
```

## NodeJS Library
```javascript
var TubeMap = require('tubemaps').TubeMap;
var london = new TubeMap({
  stations: csv.stations,
  lines: csv.lines,
  connections: csv.connections
});

// Find information about a station
var victoriaStation = london.getStationByName('Victoria');
// {conns:[{display_name: "Euston"}, ...], ..}

// Find information a line
var victoriaLine = london.getLineByName('Victoria Line');
// [station1, station2,..]

// Find all connections in a line
var conns = london.line(victoriaLine)
// [{station1: #euston, station2: #warrentStreet}]

// Find path between two stations
var conns = london.path(euston, victoria)
// [{station1: #euston, station2: #warrentStreet, line: #victoriaLine}]

// Find path between two stations in a line
var conns = london.path(euston, victoria, line)
// [{station1: #euston, station2: #warrentStreet, line: #victoriaLine}]
```

## Existing datasets

#### London
```javascript
var Maps = require('tubemaps/maps');

Maps("london", function(err, tube) {
  var euston = tube.getStationByName("Euston");
  var victoria = tube.getStationByName("Victoria");
  console.log(tube.path(euston, victoria))
})
```

#### Use yours

Look at our datasets and make it identical but with your data

```javascript
var TubeMap = require('tubemaps').TubeMap;
var readCSVs = require('tubemaps/csv').readCSVs;

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

  var victoriaLine = tubemap.getLineByName("Victoria Line");
  console.log(tubemap.line(victoriaLine.line));

});
```

## Want to contribute or add dataset?

- Ping me on twitter @nicolagreco, or a PR here.
