exports.TubeMap = TubeMap;

function Station(opts) {
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
  this.lines = opts.lines || [];
  this.connections = opts.connections || [];

  this.calculate();
}

TubeMap.prototype.getLine = function(id) {
  return tubemap.linesById[id];
};

TubeMap.prototype.getStation = function(id) {
  return tubemap.stationsById[id];
};

TubeMap.prototype.calculate = function() {
  var tubemap = this;

  this.stations.forEach(function(s) {
    s = new Station(s);
    tubemap.stationsById[s.id] = s;
    tubemap.stationsByName[s.name] = s;
  });

  this.connections.forEach(function(c) {
    c.station1 = tubemap.stationsById[c.station1];
    c.station2 = tubemap.stationsById[c.station2];
    c.time = parseInt(c.time, 10);

    c.station1.conns.push(c);
    c.station2.conns.push(c);
  });

  this.lines.forEach(function(r) {
    tubemap.linesById[r.line] = r;
  });
};