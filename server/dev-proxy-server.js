#!/usr/bin/env node

/*
Use this script for local development against a remote API without CORS issues.

This script will launch a reverse proxy listening on localhost:5050 with all related API calls
forwarding to http://localhost:9000 and all other requests forwarding to the local Angular development server at
http://localhost:4200

 */
var http = require('http');
var httpProxy = require('http-proxy');

var APP_URL = 'http://localhost:4200';

var API_PATHS = ['/api'];
var API_URL = 'http://localhost:9000';


var proxy = httpProxy.createProxyServer({ changeOrigin: true });

var server = http.createServer(function (req, res) {
  var target = APP_URL;

  for (var i = 0; i < API_PATHS.length; i++) {
    if (req.url.startsWith(API_PATHS[i])) {
      target = API_URL;
      break;
    }
  }
  proxy.web(req, res, { target: target });

  proxy.on('error', function (e) {
    console.log(`${'Proxy Error:'}${e}`);
  });

});

console.log('Proxy Server listening on port 5050');
server.listen(5050);
