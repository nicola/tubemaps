# Tubemaps

Given a dataset, get all the tube/stations relations done!

![London tubemap](https://raw.githubusercontent.com/nicola/tubemaps/master/thumbnail.png)

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

```sh
$ tubemaps path  --from "Euston" --to "Hammersmith"
# Piccadilly Line: Hammersmith to Barons Court
# Piccadilly Line: Barons Court to Earl's Court
# Piccadilly Line: Earl's Court to Gloucester Road
# Piccadilly Line: Gloucester Road to South Kensington
# Piccadilly Line: South Kensington to Knightsbridge
# Piccadilly Line: Knightsbridge to Hyde Park Corner
# Piccadilly Line: Hyde Park Corner to Green Park
# Victoria Line: Green Park to Oxford Circus
# Victoria Line: Oxford Circus to Warren Street
# Victoria Line: Warren Street to Euston

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

## Soon
```javascript
var tube = require('tubemaps').London;

// Show all paths, sorted by shortest
tube.from('Victoria').to('Euston');
```

## Want to contribute or add dataset?

- Ping me on twitter @nicolagreco, or a PR here.
