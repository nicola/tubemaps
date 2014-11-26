var async = require('async');
var fs = require('fs');
var path = require('path');
var CSVStream = require('csv-streamify');
var JSONStream = require('JSONStream');
var __ = require('highland')

exports.TubeMap = TubeMap;

function Station(opts) {
  this.id = opts.id;
  this.conns = opts.conns || [];
  this.name = opts.name || "Unknown";
  this.display_name = opts.display_name || "Unknown";
  this.rail = opts.rail ? parseInt(opts.rail, 10) : null;
  this.total_lines = opts.total_lines ? parseInt(opts.total_lines, 10) : 1;
  this.latitude = parseFloat(opts.latitude);
  this.longitude = parseFloat(opts.longitude);
}

function TubeMap(opts) {
  opts = opts || {};
  this.stationsById = {};
  this.stationsByName = {};
  this.linesById = {};
  this.linesByName = {};
  this.stations = opts.stations || [];
  this.connections = opts.connections || [];
  this.lines = opts.lines || [];

  this.make();
}

TubeMap.prototype.makeStation = function(s) {
  s = new Station(s);
  this.stationsById[s.id] = s;
  this.stationsByName[s.name] = s;
};

TubeMap.prototype.path = function(from, to) {
  var station1 = this.getStationByName(from);
  var station2 = this.getStationByName(to);

  return [];
};

TubeMap.prototype.getAdjacent = function (root, line) {
  return root.conns
      .filter(function (c) {
        return c.line == line;
      })
      .map(function(c) {
        return c.station1.id !== root.id ? c.station1 : c.station2;
      });
};

TubeMap.prototype.constructPath = function (dict, path, start, destination){
  if (path[path.length-1] && path[path.length-1].station2 == start) {
    return path;
  }
  console.log(start.name, destination.name);
  path.push({station1: destination, station2: dict[destination.id]});
  return this.constructPath(dict, path, start, dict[destination.id]);
};

TubeMap.prototype.path = function(start, destination, line){
  var Q = [start];
  var V = {};
  var family = {};
  family[start.id] = null;
  
  while (Q.length > 0) {
    var currentStation = Q.shift();
    // console.log("-", currentStation.name);
    if (currentStation.id in V) {
      console.log("already visited, skip");
      continue;
    }
    var conns = this.getAdjacent(currentStation, line);
    conns.forEach(function(child) {
      if (!(child.id in V)){
        Q.push(child);
      }

      if (!(child.id in family)){
        family[child.id] = currentStation;
      }
    });

    // console.log("  ", conns.map(function(d) { return d.name}));
    // console.log("  Q", Q.map(function(d){ return d.name}))
    V[currentStation.id] = currentStation;
    if (currentStation.id === destination.id) {
      return this.constructPath(family, [], start, destination)
        .map(function(d) {
          d.line = line;
          return d;
        });
    }
  }
  return false;
};

TubeMap.prototype.line = function(id) {
  return this.connections.filter(function(d) {
    return d.line == id;
  });
};

TubeMap.prototype.makeConnection = function(c) {
  c.station1 = this.stationsById[c.station1];
  c.station2 = this.stationsById[c.station2];
  c.time = parseInt(c.time, 10);

  c.station1.conns.push(c);
  c.station2.conns.push(c);
};

TubeMap.prototype.makeLine = function(r) {
  this.linesById[r.line] = r;
  this.linesByName[r.name] = r;
};

TubeMap.prototype.getLine = function(id) {
  return this.linesById[id];
};

TubeMap.prototype.getLineByName = function(name) {
  return this.linesByName[name];
}

TubeMap.prototype.getStation = function(id) {
  return this.stationsById[id];
};

TubeMap.prototype.getStationByName = function(display_name) {
  return this.stationsByName[display_name];
};

TubeMap.prototype.make = function() {
  this.stations.forEach(this.makeStation.bind(this));
  this.connections.forEach(this.makeConnection.bind(this));
  this.lines.forEach(this.makeLine.bind(this));
};

exports.readCSV = function (file, cb) {
  __(fs
    .createReadStream(file)
    .pipe(CSVStream({objectMode: true, columns: true})))
    .errors(cb)
    .collect()
    .apply(function(lines) {
      cb(null, lines);
    });
};

exports.readCSVs = function (opts, cb) {
  async.map(
    [
      opts.connections,
      opts.lines,
      opts.stations
    ],
    exports.readCSV,
    cb);
};