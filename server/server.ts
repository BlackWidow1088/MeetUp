
const express = require('express');
const readAllLessons = require('./read-all-lessons.route');
const addPushSubscriber = require('./add-push-subscriber.route');
const sendNewsletter = require('./send-newsletter.route');

const bodyParser = require('body-parser');

const webpush = require('web-push');

const vapidKeys = {
  "publicKey":"BEsG2x5tWdnlWiuziUTmNIKDhEdYmwJBqqg8xVoHuTwi3dnNhHhFiPC_RnqHjgx2xW_4im9ypuJz3gf_s1pGueE",
  "privateKey":"EKCIg0owHSSzLAb5Y9ZUQWw44uoJwwZM9K1hZqvajh4"
};


webpush.setVapidDetails(
  'mailto:chavan.abhijeet1088@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);




const app = express();


app.use(bodyParser.json());
app.use(express.static('dist'));


// REST API
// TODO: make this path dynamic
app.use('/', express.static('dist/Data-Center-Advisor'));
app.route('/api/lessons')
    .get(readAllLessons);

app.route('/api/notifications')
    .post(addPushSubscriber);

app.route('/api/newsletter')
    .post(sendNewsletter);




// launch an HTTP Server
const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});









