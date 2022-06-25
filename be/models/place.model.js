//Group members
//Hung Man Kei   (1155127099)	   Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)      Tsai Kwun Ki      (1155126289)

var mongoose = require('../db/db.js');

// schema
const classSchema = new mongoose.Schema({
    name: String,
    formatted_address: String,
    formatted_phone_number: String,
    icon: String,
    geometry: {},
    opening_hours: {},
    place_id: String,
    rating: Number,
    user_ratings_total: Number,
    wait: {},
    website: String,
})
// model
const classModel = mongoose.model('place', classSchema)

module.exports = classModel