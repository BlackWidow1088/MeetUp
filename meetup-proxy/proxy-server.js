#!/usr/bin/env node

/*
Use this script for local development against a remote API without CORS issues.

This script will launch a reverse proxy listening on localhost:5050 with all related API calls
forwarding to http://localhost:9000 and all other requests forwarding to the local Angular development server at
http://localhost:4200

 */
var http = require('http');
var httpProxy = require('http-proxy');

const type = process.argv[2];

var GUI_URL = 'http://localhost:5050';
if(type === 'dev') {
  GUI_URL = 'http://localhost:4200';
}

var API_PATHS = ['/api'];
var API_URL = 'http://localhost:9000';

var AUTH_PATHS = ['/auth'];
var AUTH_URL = 'http://localhost:9002';

var proxy = httpProxy.createProxyServer({ changeOrigin: true });

var server = http.createServer(function (req, res) {
  var target = GUI_URL;

  for (var i = 0; i < API_PATHS.length; i++) {
    if (req.url.startsWith(API_PATHS[i])) {
      target = API_URL;
      break;
    }
  }
  for (var i = 0; i < AUTH_PATHS.length; i++) {
    if (req.url.startsWith(AUTH_PATHS[i])) {
      target = AUTH_URL;
      break;
    }
  }
  proxy.web(req, res, { target: target });

  proxy.on('error', function (e) {
    console.log(`${'Proxy Error:'}${e}`);
  });

});

console.log('Proxy Server listening on port 5052');
server.listen(5052);
