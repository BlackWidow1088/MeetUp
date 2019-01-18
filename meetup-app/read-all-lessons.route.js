
const db = require('./database');

const readAllLessons = function (req, res) {

    res.status(200).json({lessons:db.readAllLessons()});

}
module.exports = readAllLessons;
