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

TubeMap.prototype.makeConnection = function(c) {
  c.station1 = this.stationsById[c.station1];
  c.station2 = this.stationsById[c.station2];
  c.time = parseInt(c.time, 10);

  c.station1.conns.push(c);
  c.station2.conns.push(c);
};

TubeMap.prototype.makeLine = function(r) {
  this.linesById[r.line] = r;
}

TubeMap.prototype.getLine = function(id) {
  return this.linesById[id];
};

TubeMap.prototype.getStation = function(id) {
  return this.stationsById[id];
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