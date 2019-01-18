const jwt = require('jsonwebtoken');
const fs = require('fs');
const jwksRsa = require('jwks-rsa');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  // Seperate authentication server
  const client = jwksRsa({
    rateLimit: true,
    jwksRequestsPerMinute: 10, // Default value
    jwksUri: "http://localhost:9002/public.json"
  });
  let RSA_PUBLIC_KEY = 'key null';

  // TODO: remove callback and substitute with promise or observable
  // kid: 'edf6c3c8-986b-471c-8bfe-7144a8cf7cc2'
  client.getSigningKey('edf6c3c8-986b-471c-8bfe-7144a8cf7cc2', (err, key) => {
    if (err) {
      return res.json({ error: err });
    }
    RSA_PUBLIC_KEY = key.publicKey || key.rsaPublicKey;
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
  });
};

module.exports = {
  checkToken: checkToken
}
