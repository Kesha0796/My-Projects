
var {mongoose} = require('../../backend/db/mangoose');
var {UserInfo}=require('../../backend/models/userinfo');

function handle_request(msg, callback){
    console.log("display");
  //  console.log(req.body);
    //mongodb logic for getting edit profile data
    UserInfo.findOne({
        firstname:msg.firstname
    }, function(err,users){
        if (err) {
            // res.code = "400";
            // res.value = "The email and password you entered did not match our records. Please double-check and try again.";
            console.log(res.value);
            // res.sendStatus(400).end(); 
            
            console.log("in");
               callback(null,[]);
        } else{
            // res.code = "200";
            // res.value = users;
            console.log("display data");
            console.log(users);
            
                               
            callback(null,users);
        }
    })

}

exports.handle_request = handle_request;