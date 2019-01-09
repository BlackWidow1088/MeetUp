const jwt = require('jsonwebtoken');
const fs = require('fs');
const RSA_PUBLIC_KEY = fs.readFileSync('./server/keys/public.key');

// if authentication server hosted seperately
// const jwksRsa = require('jwks-rsa');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  //  incase of seperate authentication server we can have
  // RSA_PUBLIC_KEY = jwksRsa.expressJwtSecret({
  //   cache: true,
  //   rateLimit: true,
  //   jwksUri: "https://angularuniv-security-course.auth0.com/.well-known/jwks.json"
  // });

  if (token) {
    jwt.verify(token, RSA_PUBLIC_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}
