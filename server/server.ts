
// Connect-Pod project name
const express = require('express');
const readAllLessons = require('./read-all-lessons.route');
const addPushSubscriber = require('./add-push-subscriber.route');
const sendNewsletter = require('./send-newsletter.route');
const tokenMiddleware = require('./checkToken.middleware');
const systemDiagram = require('./system-diagram.js');
const settings = require('./settings');
const upload = require('./upload');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const expressJwt = require('express-jwt');
const path = require('path');
const busboy = require('connect-busboy');

const TIMEOUT = 120;
const RSA_PRIVATE_KEY = fs.readFileSync('./server/keys/private.key');
// const RSA_PUBLIC_KEY = fs.readFileSync('./server/keys/public.key');
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
app.use(express.static('dist'));
app.use(express.static('server'));
app.use('/', express.static('dist/Data-Center-Advisor'));
app.use(busboy());
app.route('/api/lessons')
  .get(tokenMiddleware.checkToken, readAllLessons);

app.route('/api/notifications')
  .post(addPushSubscriber);

app.route('/api/newsletter')
  .post(sendNewsletter);

app.route('/api/login')
  .post(loginRoute);

app.get('/api/download', (req,res) => {
  res.download(path.join(process.cwd(), 'server', 'user', 'abhi.txt'));
});

// TODO: alternative for upload using formiddable
// app.route('/api/upload').post(upload);
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

function loginRoute(req, res) {
  const email = req.body.email,
    password = req.body.password;

  if (validateEmailAndPassword({email, password})) {
    const userId = findUserIdForEmail(email);

    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: TIMEOUT,
      subject: userId
    });
    res.status(200).json({
      idToken: jwtBearerToken,
      expiresIn: TIMEOUT
    });
  } else {
    // send status 401 Unauthorized
    res.sendStatus(401);
  }
}

function findUserIdForEmail(email) {
return 'abhijeet';
}
function validateEmailAndPassword(details) {
  if (details.email === 'chavan.abhijeet1088@gmail.com' && details.password === 'abc') {
    return true;
  }
  return false;
}


// launch an HTTP Server
const httpServer = app.listen(9000, () => {
  console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});









