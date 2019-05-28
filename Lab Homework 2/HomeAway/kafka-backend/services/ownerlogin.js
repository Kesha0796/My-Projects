//var mongo = require('./mongo');
//var bcrypt = require('bcrypt');
var {mongoose} = require('../../backend/db/mangoose');
var {Users}=require('../../backend/models/users');


function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));


    console.log("Inside Owner Login Post Request");
        var username = msg.username;
        var password = msg.password;
        console.log(username+" "+password);
        Users.findOne({username:username}).then((user)=>{
            console.log("Users",user);
            var resData={
                status:200,
                result:{user}
            }
            callback(null,resData);
        },(err) => {
            console.log(err);
            callback(null,[]);
        })
}

exports.handle_request = handle_request;