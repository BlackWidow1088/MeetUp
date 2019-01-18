
// Connect-Pod project name
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const expressJwt = require('express-jwt');
const path = require('path');

const TIMEOUT = 120;
const RSA_PRIVATE_KEY = fs.readFileSync('./keys/private.key');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.route('/auth/login')
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
const httpServer = app.listen(9002, () => {
  console.log("HTTP Authentication Server running at http://localhost:" + httpServer.address().port);
});









