
var {mongoose} = require('../../backend/db/mangoose');
var db = require('../../backend/app/db');
var crypt = require('../../backend/app/crypt');
var jwt = require('jsonwebtoken');
var config = require('../../backend/config/settings');



function handle_request(msg, callback){
    console.log("Inside Create Request Handler");
        if (!msg.email || !msg.password) {
            response.status(400).json({success: false, message: 'Please enter username and password.'});
            console.log("False Method");
        }
        else
        {
            console.log("True Mthod");
            var newUser = {
                username: msg.email,
                password: msg.password,
                firstname:msg.firstname,
                lastname:msg.lastname
            };
    
            // Attempt to save the user
            db.createUser(newUser, function (res) {
               console.log("user created");
               var resData={
                username: msg.email,
                password: msg.password,
                firstname:msg.firstname,
                lastname:msg.lastname
            }
                callback(null,resData);
            }, function (err) {
                console.log("error creating user");
                console.log(err);
               callback(null,[]);
            });
    }
}

exports.handle_request = handle_request;