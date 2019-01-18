
const all = require('lodash');
const LESSONS = require('./database-data');

class InMemoryDatabase {

    readAllLessons() {
        return all.values(LESSONS);
    }

}




const db = new InMemoryDatabase();
module.exports = db;

