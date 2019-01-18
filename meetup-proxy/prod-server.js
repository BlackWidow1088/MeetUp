const express = require('express');
const app = express();
app.use('/', express.static('../meetup-gui-build/meetup-gui'));
// launch an HTTP Server
const httpServer = app.listen(5050, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
  });