var TradingObject = require('../models/TradingObject');
const mongoose = require("mongoose");
mongoose.connect('localhost:27017/bttm');

var length = 0;
var done = 0;


var obj = [
    new TradingObject({
        name: "Pencil",
        description:"This is a pencil",
        image: {
            path200: "users/items/-reSized-200-item-image-1510363595663.jpg",
            path400: "users/items/-reSized-400-item-image-1510363595663.jpg",
            path800: "users/items/-reSized-800-item-image-1510363595663.jpg"
        },
        user: "a",
        dateOf: Date("2017-11-11T01:26:35.624Z")
    }), new TradingObject({
        name: "Pen",
        description:"The sword is mightier than the pen",
        image: {
            path200: "users/items/-reSized-200-item-image-1510363703834.jpg",
            path400: "users/items/-reSized-400-item-image-1510363703834.jpg",
            path800: "users/items/-reSized-800-item-image-1510363703834.jpg"
        },
        user: "a",
        dateOf: Date("2017-11-11T01:28:23.802Z")
    }), new TradingObject({
        name: "Nootebook",
        description:"This is my notebook",
        image: {
            path200: "users/items/-reSized-200-item-image-1510364013717.jpeg",
            path400: "users/items/-reSized-400-item-image-1510364013717.jpeg",
            path800: "users/items/-reSized-800-item-image-1510364013717.jpeg"
        },
        user: "b",
        dateOf: Date("2017-11-11T01:33:33.681Z")
    }), new TradingObject({
        name: "Graphics Card",
        description:"GT 90x Graphics Card",
        image: {
            path200: "users/items/-reSized-200-item-image-1510364525142.jpg",
            path400: "users/items/-reSized-400-item-image-1510364525142.jpg",
            path800: "users/items/-reSized-800-item-image-1510364525142.jpg"
        },
        user: "liljen",
        dateOf: Date("2017-11-11T01:42:05.108Z")
    }), new TradingObject({
        name: "Processor",
        description:"This is my speedy processor",
        image: {
            path200: "users/items/-reSized-200-item-image-1510364917453.jpg",
            path400: "users/items/-reSized-400-item-image-1510364917453.jpg",
            path800: "users/items/-reSized-800-item-image-1510364917453.jpg"
        },
        user: "littl_mac",
        dateOf: Date("2017-11-11T01:48:37.419Z")
    })
];

length = obj.length;

for(var i =0; i < length ;i++){
  obj[i].save(function(result){
    done++;
    if(done === length)
      exit();
  })
}

function exit(){
    mongoose.disconnect();
}
