var User = require('../models/User');
const mongoose = require("mongoose");
mongoose.connect('localhost:27017/bttm');

var length = 0;
var done = 0;


var obj = [
    new User({
        password: "$2a$10$LqeJySlhWmCvyMbq8ca.negc6kobq1Z7x3A98lSpLL6Jo7rnBlBQm",
        first_name: "a",
        last_name: "a",
        username: "a",
        email: "a@a",
        user_image: {
            path200: "users/profileImage/-reSized-200-image-1510362260179.png",
            path400: "users/profileImage/-reSized-400-image-1510362260179.png",
            path800: "users/profileImage/-reSized-800-image-1510362260179.png"
            }
    }),new User({
        password: "$2a$10$35GrBpkoHT5fMSwAPoUYW.4P.dKlQxD3jQNGNrJxudwAcNv4F/UJi",
        first_name: "b",
        last_name: "b",
        username: "b",
        email: "b@b",
        user_image: {
            path200: "users/profileImage/-reSized-200-image-1510363890913.png",
            path400: "users/profileImage/-reSized-400-image-1510363890913.png",
            path800: "users/profileImage/-reSized-800-image-1510363890913.png"
            }
    }),new User({
        password: "$2a$10$4CJPTlkREE1fKbqX5NE5yepgXJUhfHMOvCCs2FnHM0Vaw7.A8DPoa",
        first_name: "Jeanette",
        last_name: "Phung",
        username: "liljen",
        email: "jen@gmail.com",
        user_image: {
            path200: "users/profileImage/-reSized-200-image-1510364226979.png",
            path400: "users/profileImage/-reSized-400-image-1510364226979.png",
            path800: "users/profileImage/-reSized-800-image-1510364226979.png"
            }
    }),new User({
        password: "$2a$10$qJjhOejm/ruwrxT3DMCyHOTnrDBBR9bc.0Y.RSGUhGa7pbCG9o0EG",
        first_name: "Little",
        last_name: "Mac",
        username: "littl_mac",
        email: "lm@gmail.com",
        user_image: {
            path200: "users/profileImage/-reSized-200-image-1510364800669.jpg",
            path400: "users/profileImage/-reSized-400-image-1510364800669.jpg",
            path800: "users/profileImage/-reSized-800-image-1510364800669.jpg"
            }
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
