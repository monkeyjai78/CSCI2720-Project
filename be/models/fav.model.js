//Group members
//Hung Man Kei   (1155127099)	   Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)      Tsai Kwun Ki      (1155126289)

var mongoose = require('../db/db.js');

//schema
const classSchema = new mongoose.Schema({
    place_id: String,
    user_id: String,
})
//model
const classModel = mongoose.model('fav', classSchema)

module.exports = classModel