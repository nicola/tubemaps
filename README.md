# Tubemaps

Given a dataset, get all the tube/stations relations done!

![London tubemap](https://raw.githubusercontent.com/nicola/tubemaps/master/thumbnail.png)

## Install
```javascript
npm install --save tubemaps
```

Soon on **bower**.

## Usage
```javascript
var TubeMap = require('tubemaps').TubeMap;
var london = new TubeMap({
  stations: csv.stations,
  lines: csv.lines,
  connections: csv.connections
});

london.getStation('Victoria');
// {conns:[{display_name: "Euston"}, ...], ..}

london.getLine('Victoria line');
// [station1, station2,..]
```

## Soon
```javascript
var tube = require('tubemaps').London;

// Show all paths, sorted by shortest
tube.from('Victoria').to('Euston');
```

## Want to contribute or add dataset?

- Ping me on twitter @nicolagreco, or a PR here.
