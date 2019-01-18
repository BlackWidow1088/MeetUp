
// Connect-Pod project name
const express = require('express');
const readAllLessons = require('./read-all-lessons.route');
const addPushSubscriber = require('./add-push-subscriber.route');
const sendNewsletter = require('./send-newsletter.route');
const tokenMiddleware = require('./checkToken.middleware');
const systemDiagram = require('./system-diagram.js');
const settings = require('./settings');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const expressJwt = require('express-jwt');
const path = require('path');
const busboy = require('connect-busboy');

const TIMEOUT = 120;
const vapidKeys = {
  "publicKey": "BEsG2x5tWdnlWiuziUTmNIKDhEdYmwJBqqg8xVoHuTwi3dnNhHhFiPC_RnqHjgx2xW_4im9ypuJz3gf_s1pGueE",
  "privateKey": "EKCIg0owHSSzLAb5Y9ZUQWw44uoJwwZM9K1hZqvajh4"
};

const app = express();

webpush.setVapidDetails(
  'mailto:chavan.abhijeet1088@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.use(bodyParser.json());
app.use(express.static('../meetup-gui-build'));
app.use('/', express.static('../meetup-gui-build/meetup-gui'));
app.use(busboy());
app.route('/api/lessons')
  .get(tokenMiddleware.checkToken, readAllLessons);

app.route('/api/notifications')
  .post(addPushSubscriber);

app.route('/api/newsletter')
  .post(sendNewsletter);

app.get('/api/download', (req,res) => {
  res.download(path.join(process.cwd(), 'user', 'abhi.txt'));
});

app.post('/api/upload',function(req,res) {
  let fstream;
  let filedata;
  let filesize = 0;

  req.pipe(req.busboy);
  req.busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      filesize = val;
  });
  req.busboy.on('file', function (fieldname, file, filename) {
      let extension = filename.split('.');
      //APPROACH 1: SAVING LOCALLY ON SERVER THEN TRANSFERRING TO S3
      const filenm_str = `abhi.${extension[extension.length - 1]}`;
      fstream = fs.createWriteStream(__dirname+"/user/"+ filenm_str);
      file.pipe(fstream);
      fstream.on('close',function() {
          res.status(200).send('ok');
          // TODO: if amazon s3 added in future
          // uploadto_s3(__dirname+"/files/"+filenm_str,filenm_str);
        });


      //APPROACH 2: DIRECTLY STREAMING TO S3 WITHOUT SAVING ON SERVER
      // var filenm_str = "abhi_" + (Date.now() - 10000000) + ".jpeg";
      // uploadS3(file, filenm_str, function (err) {
      //     if (err) { console.log("failed uploading " + err); }
      //     else {
      //         console.log("successful upload " + cnt); cnt++;
      //          retrievefrom_s3(filenm_str,res);
      //     }
      // });
  });
  req.busboy.on('finish', function () {
  });

});

app.get(`/api/system/:systemid/diagram`, (req, res) => {
  res.send(JSON.stringify(systemDiagram));
});
app.get('/api/system/settings/:userid', (req, res) => {
  res.send(JSON.stringify(JSON.stringify(settings)));
});


// launch an HTTP Server
const httpServer = app.listen(9000, () => {
  console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});









