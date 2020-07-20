'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImdbSchema = new Schema({
        Title: String,
        Year:String,
        Released:String,
        Genre:String,
        Director:String,
        Awards:String ,
        ImdbID:String ,
        Type: String,
        Ratings: Array
});

module.exports = mongoose.model('ImdbData', ImdbSchema );