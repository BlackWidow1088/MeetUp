
// Connect-Pod project name
const express = require('express');
const readAllLessons = require('./read-all-lessons.route');
const addPushSubscriber = require('./add-push-subscriber.route');
const sendNewsletter = require('./send-newsletter.route');
const tokenMiddleware = require('./checkToken.middleware');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const expressJwt = require('express-jwt');

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
app.use('/', express.static('dist/Data-Center-Advisor'));
app.route('/api/lessons')
  .get(tokenMiddleware.checkToken, readAllLessons);

app.route('/api/notifications')
  .post(addPushSubscriber);

app.route('/api/newsletter')
  .post(sendNewsletter);

app.route('/api/login')
  .post(loginRoute);

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









