//var mongo = require('./mongo');
//var bcrypt = require('bcrypt');
var {mongoose} = require('../../backend/db/mangoose');
var {Booking}=require('../../backend/models/booking');


function handle_request(msg, callback){
    console.log("inside bboking details method");
        console.log(msg.username);
    
        Booking.find({
            username:msg.username
        },
        function(err,result)
        {
            if(err)
            {
                console.log(err);
                callback(null,[]);
            }
            else
            {
                console.log("My Trips Data",result);
                callback(null,result);
            }
        })
}

exports.handle_request = handle_request;