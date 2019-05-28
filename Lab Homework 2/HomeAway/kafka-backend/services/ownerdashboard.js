//var mongo = require('./mongo');
//var bcrypt = require('bcrypt');
var {mongoose} = require('../../backend/db/mangoose');
var {Property}=require('../../backend/models/property');


function handle_request(msg, callback){
    console.log("inside ownerdashboard");
    console.log(msg.username);

    Property.find({
        username:msg.username
    },
    function(err,result){
        if(err)
        {
            console.log(err);
            callback(null,[]);
        }
        else
        {
            console.log(result);
            var resData={
                status:200,
                result:result
            }
            callback(null,resData);
        }
    })
}

exports.handle_request = handle_request;